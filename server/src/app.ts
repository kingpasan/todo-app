import express from "express";
import cors from "cors";

const app = express();
const apiRouter = express.Router();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

apiRouter.get("/ping", (_req, res) => {
  res.json({
    status: "ok",
    message: "Express API is running...",
  });
});

app.use("/api", apiRouter);

export default app;
