import express from 'express';
import cors from 'cors';
import { PrismaClient } from './src/db/client.ts';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// Initialization route to create admin user
app.post('/api/init', async (req: express.Request, res: express.Response) => {
  const { createAdminUser } = await import('./src/controllers/initController.ts');
  await createAdminUser();
  res.json({ message: "Admin user created" });
});

// GET movies
app.get("/movies", async (req: express.Request, res: express.Response) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
});

// POST movie
app.post("/movies", async (req: express.Request, res: express.Response) => {
  const { title, duration } = req.body;

  const movie = await prisma.movie.create({
    data: { title, duration },
  });

  res.json(movie);
});

// GET bookings
app.get("/bookings", async (req: express.Request, res: express.Response) => {
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
