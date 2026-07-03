export interface ScreenshotIssue {
  id: number;
  title: string;
  description: string;

  severity: "High" | "Medium" | "Low";

  x: number;
  y: number;

  width: number;
  height: number;
}