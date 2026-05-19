/**
 * Login controller for handling authentication requests
 * @param {*} req 
 * @param {*} res 
 * @returns JSON response with success or error message
 */
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import { PrismaClient } from "../db/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
const secret = process.env.JWT_SECRET;

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!secret) {
	  return res.status(500).json({ message: "JWT secret is not configured" });
  }

  if (!email || !password) {
	  return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    message: "Login successful",
    token: jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' }),
  });
};

export const validateToken = (req: Request, res: Response) => {
  // Here you would normally validate the token sent in the request headers
  const token = req.headers.authorization;

  if (!secret) {
	  return res.status(500).json({ message: "JWT secret is not configured" });
  }

  if (!token) {
	  return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.json({ message: "Token is valid", decoded });
  } catch (error) {
	  res.status(401).json({ message: "Invalid token" });
  }
};