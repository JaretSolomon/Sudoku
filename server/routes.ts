import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this is a client-only application, we don't need any API routes
  // The app works entirely in the frontend

  const httpServer = createServer(app);

  return httpServer;
}
