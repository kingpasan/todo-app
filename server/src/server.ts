import "dotenv/config";
import app from "./app";

const startServer = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;

    const server = app.listen(port, () => {
      console.log(`Todo Server is running at http://localhost:${port}`);
    });

    const shutdown = () => {
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
