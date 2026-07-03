import "dotenv/config"; 
import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes"; 
import compareRoutes from "./routes/compareRoutes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", analyzeRoutes);
app.use("/api/compare", compareRoutes);
app.use(
  "/screenshots",
  express.static(path.join(process.cwd(), "screenshots"))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});