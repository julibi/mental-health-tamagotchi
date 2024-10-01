import express, { Request, Response } from "express";
import tamagotchiRouter from "./routes/tamagotchiRoutes";
import "./db";

const app = express();

// we need to put it in the beginning of the file
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception! 💥 Shutting down...");
  // here we need to crash the application, because the node process is in an unclean state
  process.exit(1);
});

// Middleware
app.use(express.json());

// Redis Client
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || 'redis',
//   port: Number(process.env.REDIS_PORT) || 6379,
// });

// redisClient.on('error', (err) => console.error('Redis error:', err));

// API Route with Redis Caching
// app.get('/', async (req, res) => {
//   const cacheKey = 'home_page_data';

//   // Check if data exists in Redis cache
//   redisClient.get(cacheKey, async (err, cachedData) => {
//     if (err) throw err;

//     if (cachedData) {
//       // If cache exists, return cached data
//       return res.send(`Cached Data: ${cachedData}`);
//     } else {
//       // Fetch new data (you can replace this with actual database fetching logic)
//       const data = 'Hello from the backend!';

//       // Cache the new data in Redis for subsequent requests
//       redisClient.setex(cacheKey, 3600, data);  // Cache for 1 hour (3600 seconds)

//       return res.send(`Fresh Data: ${data}`);
//     }
//   });
// });

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Unhandled Rejection! 💥 Shutting down...");
  // first close the server gracefully, son running requests can finish, and then close the application
  server.close(() => {
    process.exit(1);
  });
});

// ROUTERS
app.get("/", async (req: Request, res: Response) => {
  return res.send(
    `Hello from the backend, we are here on build station! Juhu!`
  );
});

app.use("/api/v1/tamagotchis", tamagotchiRouter);
