import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user's geolocation based on IP address
  app.get("/api/geolocation", async (req, res) => {
    try {
      const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      
      // Use ip-api.com for free IP geolocation (no API key required)
      const response = await fetch(`http://ip-api.com/json/${clientIp}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        res.json({
          state: data.regionName,
          country: data.country,
          countryCode: data.countryCode
        });
      } else {
        res.json({ state: null, country: null, countryCode: null });
      }
    } catch (error) {
      console.error('Geolocation error:', error);
      res.json({ state: null, country: null, countryCode: null });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
