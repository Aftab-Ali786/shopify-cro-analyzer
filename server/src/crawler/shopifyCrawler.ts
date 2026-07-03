import { chromium } from "playwright";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

import { HomepageEvidence } from "../types/shopify";
import { crawlProduct } from "./productCrawler";
import { detectTrustSignals } from "../utils/trustSignals";

export async function crawlShopifyStore(
  url: string,
  screenshotFilename: string
): Promise<HomepageEvidence> {

  const browser = await chromium.launch({
    headless: true,
  });

  try {

    const page = await browser.newPage({
      viewport: {
        width: 1440,
        height: 900,
      },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36",
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait for lazy-loaded content
    await page.waitForTimeout(3000);

    // Scroll to bottom
    await page.evaluate(async () => {

      await new Promise<void>((resolve) => {

        let totalHeight = 0;
        const distance = 500;

        const timer = setInterval(() => {

          window.scrollBy(0, distance);

          totalHeight += distance;

          if (totalHeight >= document.body.scrollHeight) {

            clearInterval(timer);

            resolve();

          }

        }, 200);

      });

    });

    await page.waitForTimeout(1000);

    //-----------------------------------------
    // Screenshot
    //-----------------------------------------

    const screenshotDir = path.join(process.cwd(), "screenshots");

    if (!fs.existsSync(screenshotDir)) {

      fs.mkdirSync(screenshotDir, {
        recursive: true,
      });

    }

    await page.screenshot({

      path: path.join(
        screenshotDir,
        screenshotFilename
      ),

      fullPage: true,

    });

    //-----------------------------------------
    // HTML
    //-----------------------------------------

    const html = await page.content();

    const $ = cheerio.load(html);

    //-----------------------------------------
    // Store
    //-----------------------------------------

    const title = $("title").text().trim();

    const description =
      $('meta[name="description"]').attr("content") ?? "";

    const heroHeading =
      $("h1").first().text().trim();

    //-----------------------------------------
    // Trust
    //-----------------------------------------

    const trustSignals =
      detectTrustSignals(html);

    const announcementBar =
      $(".announcement-bar").text().trim() ||
      $("[class*=announcement]").text().trim();

    const hasSearch =
      $('input[type="search"]').length > 0;

    const hasCartDrawer =
      html.includes("cart-drawer") ||
      html.includes("drawer-cart");

    const hasNewsletter =
      $('input[type="email"]').length > 0;

    //-----------------------------------------
    // Navigation
    //-----------------------------------------

    const navigation = [

      ...new Set(

        $("nav a")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter(Boolean),

      ),

    ];

    //-----------------------------------------
    // CTA
    //-----------------------------------------

    const CTA_KEYWORDS = [

      "shop now",
      "buy now",
      "add to cart",
      "checkout",
      "discover",
      "explore",
      "learn more",
      "view collection",
      "start shopping",

    ];

    const ctas = [

      ...new Set(

        $("button,a")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter((text) =>
            CTA_KEYWORDS.some((keyword) =>
              text.toLowerCase().includes(keyword)
            )
          ),

      ),

    ];

    //-----------------------------------------
    // Product Links
    //-----------------------------------------

    const productLinks = [

      ...new Set(

        $("a")
          .map((_, el) => $(el).attr("href"))
          .get()
          .filter(
            (link): link is string =>
              !!link &&
              link.includes("/products/")
          ),

      ),

    ];

    const absoluteLinks =
      productLinks
        .slice(0, 5)
        .map((link) =>
          link.startsWith("http")
            ? link
            : new URL(link, url).href
        );

    //-----------------------------------------
    // Crawl Products (Parallel)
    //-----------------------------------------

    const products = (
      await Promise.allSettled(
        absoluteLinks.map((link) =>
          crawlProduct(link)
        )
      )
    )
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<any> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    //-----------------------------------------
    // Collections
    //-----------------------------------------

    const collectionLinks = [

      ...new Set(

        $("a")
          .map((_, el) => $(el).attr("href"))
          .get()
          .filter(
            (link): link is string =>
              !!link &&
              link.includes("/collections/")
          ),

      ),

    ];

    //-----------------------------------------
    // Images
    //-----------------------------------------

    const imageUrls = $("img")
      .map((_, el) => $(el).attr("src"))
      .get()
      .filter(
        (src): src is string => !!src
      );

    //-----------------------------------------
    // Prices
    //-----------------------------------------

    const prices = $("[class*=price]")
      .map((_, el) => $(el).text().trim())
      .get();

    //-----------------------------------------
    // Shopify
    //-----------------------------------------

    const isShopify =
      html.includes("cdn.shopify.com") ||
      html.includes("Shopify") ||
      html.includes("myshopify");

    return {

      url,

      title,

      description,

      heroHeading,

      navigation,

      ctas,

      productLinks,

      collectionLinks,

      imageCount: imageUrls.length,

      imageUrls,

      prices,

      isShopify,

      products,

      trustSignals,

      announcementBar,

      hasSearch,

      hasCartDrawer,

      hasNewsletter,

      screenshots: [`/screenshots/${screenshotFilename}`],

    };

  } finally {

    await browser.close();

  }

}