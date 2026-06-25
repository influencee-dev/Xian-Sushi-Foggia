import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Brevo contact submission
  app.post("/api/brevo", async (req, res) => {
    try {
      const { email, firstName, phone, type, details } = req.body;
      
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        console.error("Missing BREVO_API_KEY environment variable");
        return res.status(500).json({ error: "Configurazione del server incompleta: API key mancante." });
      }
      
      // Format SMS (only digits, and if it starts with 3 without country code, prepend 39)
      let cleanPhone = phone ? phone.replace(/\D/g, "") : "";
      if (cleanPhone.length === 10 && cleanPhone.startsWith("3")) {
        cleanPhone = "39" + cleanPhone;
      }

      // Generate a placeholder email if none is provided
      const contactEmail = email || `${cleanPhone || Math.floor(Math.random() * 1000000)}@xiansushifoggia.it`;

      // Custom message for the contact's extra info
      let infoMsg = "";
      if (type === "booking") {
        infoMsg = `Prenotazione Tavolo: ${details.guestsCount} persone per il ${details.date} alle ${details.timeSlot}. Note: ${details.notes || 'nessuna'}`;
      } else if (type === "checkout") {
        infoMsg = `Ordine ${details.type} di €${details.total}. Note: ${details.notes || 'nessuna'}`;
      }

      const brevoBody = {
        email: contactEmail,
        attributes: {
          FIRSTNAME: firstName,
          SMS: cleanPhone,
          NOTE: infoMsg,
        },
        listIds: [45],
        updateEnabled: true
      };

      console.log("Sending contact payload to Brevo:", JSON.stringify(brevoBody));

      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(brevoBody)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Brevo API error:", errText);
        return res.status(response.status).json({ error: "Errore durante il salvataggio dei dati", details: errText });
      }

      const data = await response.json();
      console.log("Contact successfully added/updated in Brevo list 45:", data);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Server API exception:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
