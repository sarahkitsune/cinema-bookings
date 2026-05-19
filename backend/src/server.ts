import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { login, validateToken } from './controllers/authController.js';
import { createAdminUser } from './controllers/initController.js';
import { PrismaClient } from "./db/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes
app.post('/api/login', login);
app.get('/api/validate', validateToken);
app.post('/api/init', async (req, res) => {
  await createAdminUser();
  res.json({ message: "Admin user created" });
});


// GET movies
app.get("/movies", async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
});

// POST movie
app.post("/movies", async (req, res) => {
  const { title, duration } = req.body;

  const movie = await prisma.movie.create({
    data: { title, duration },
  });

  res.json(movie);
});

// GET bookings
app.get("/bookings", async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { performance: true },
  });
  res.json(bookings);
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});