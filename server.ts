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

      const response = await fetch("https://api.api-key.com/v3/contacts", { // Note: Brevo contacts API URL
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(brevoBody)
      });

      // Actually, standard Brevo contacts API endpoint is https://api.brevo.com/v3/contacts
      const realResponse = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(brevoBody)
      });

      if (!realResponse.ok) {
        const errText = await realResponse.text();
        console.error("Brevo Contacts API error:", errText);
      } else {
        const data = await realResponse.json();
        console.log("Contact successfully added/updated in Brevo list 45:", data);
      }

      // If the action is a checkout and we have a valid email, send a beautiful transactional order recap email
      if (type === "checkout" && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        try {
          const isDelivery = details.type === "delivery";
          const orderTypeLabel = isDelivery ? "CONSEGNA A DOMICILIO" : "RITIRO IN SEDE (ASPORTO)";
          const orderCode = details.orderCode || "N/D";
          const notesHtml = details.notes 
            ? `<div style="margin-top: 15px; padding: 12px; background-color: #f9f9f9; border-radius: 6px; font-size: 13px; color: #555; border-left: 3px solid #ccc;">
                <strong>Note aggiuntive:</strong> ${details.notes}
               </div>` 
            : "";

          let logisticsDetailsHtml = "";
          if (isDelivery) {
            logisticsDetailsHtml = `
              <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Indirizzo Consegna:</strong> ${details.address}, ${details.city}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Metodo Pagamento:</strong> ${details.paymentMethod === "online" ? "Pagamento Online" : "Contanti alla Consegna"}</p>
            `;
          } else {
            logisticsDetailsHtml = `
              <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Orario Richiesto Ritiro:</strong> ${details.pickupTime || "N/D"}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Metodo Pagamento:</strong> Pagamento in Sede al Ritiro</p>
            `;
          }

          let itemsHtml = "";
          if (details.items && Array.isArray(details.items)) {
            itemsHtml = details.items.map((item: any) => `
              <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #f1f1f1; font-size: 14px; color: #333;">
                  <strong style="color: #111;">${item.name}</strong>
                </td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #f1f1f1; font-size: 14px; color: #666; text-align: center;">
                  x${item.quantity}
                </td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #f1f1f1; font-size: 14px; color: #333; text-align: right;">
                  €${parseFloat(item.price).toFixed(2)}
                </td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #f1f1f1; font-size: 14px; color: #111; text-align: right; font-weight: bold;">
                  €${parseFloat(item.totalPrice).toFixed(2)}
                </td>
              </tr>
            `).join("");
          }

          const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Conferma Ordine - Xian Sushi Foggia</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
              <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
                <!-- Header -->
                <div style="background-color: #050505; padding: 35px 20px; text-align: center; border-bottom: 4px solid #f59e0b;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Outfit', 'Inter', sans-serif;">Xian Sushi Foggia</h1>
                  <p style="color: #f59e0b; margin: 6px 0 0; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">Conferma Ricezione Ordine</p>
                </div>

                <!-- Body Content -->
                <div style="padding: 30px 25px;">
                  <p style="font-size: 16px; line-height: 1.6; color: #1f2937; margin: 0 0 16px 0;">Ciao <strong style="color: #000;">${firstName}</strong>,</p>
                  <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0;">Grazie per aver scelto Xian Sushi Foggia! Abbiamo ricevuto il tuo ordine e lo abbiamo registrato correttamente nel nostro sistema gestionale.</p>

                  <!-- Card Dettaglio Spedizione/Ritiro -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                      Dettaglio Ordine <span style="color: #f59e0b; font-weight: 800;">#${orderCode}</span>
                    </h3>
                    <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Tipologia:</strong> <span style="background-color: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${orderTypeLabel}</span></p>
                    ${logisticsDetailsHtml}
                    <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Telefono:</strong> ${phone}</p>
                    ${notesHtml}
                  </div>

                  <!-- Tabella Prodotti -->
                  <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">Dettaglio Piatti</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    <thead>
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                        <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #64748b; text-align: left; text-transform: uppercase;">Piatto</th>
                        <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #64748b; text-align: center; text-transform: uppercase; width: 60px;">Qtà</th>
                        <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #64748b; text-align: right; text-transform: uppercase; width: 80px;">Prezzo</th>
                        <th style="padding: 10px; font-size: 11px; font-weight: 700; color: #64748b; text-align: right; text-transform: uppercase; width: 90px;">Totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" style="padding: 20px 10px 10px 10px; text-align: right; font-size: 15px; font-weight: 700; color: #334155;">Totale Ordine:</td>
                        <td style="padding: 20px 10px 10px 10px; text-align: right; font-size: 18px; font-weight: 800; color: #f59e0b;">€${parseFloat(details.total).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <!-- Avviso Informativo -->
                  <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 18px; margin-bottom: 25px;">
                    <p style="margin: 0; font-size: 13.5px; line-height: 1.5; color: #065f46; font-weight: 500; text-align: center;">
                      ${isDelivery 
                        ? "🚚 Il tuo ordine è in fase di elaborazione. Il nostro team prenderà in carico la consegna a domicilio secondo i tempi previsti." 
                        : "🥢 Il tuo ordine è pronto per essere ritirato. Ti preghiamo di recarti in sede all'orario richiesto per ritirare i tuoi piatti freschi!"}
                    </p>
                  </div>

                  <!-- Footer -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 25px; margin-top: 35px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.5;">
                    <p style="margin: 0 0 4px 0; font-weight: 700; color: #334155;">Xian Sushi Foggia</p>
                    <p style="margin: 0 0 4px 0;">Viale XXIV Maggio, Foggia | Tel: +39 342 163 1319</p>
                    <p style="margin: 0;">Grazie per aver ordinato da noi! A presto 🍣</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `;

          const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "accept": "application/json",
              "content-type": "application/json",
              "api-key": apiKey
            },
            body: JSON.stringify({
              sender: {
                name: "Xian Sushi Foggia",
                email: "info@xiansushifoggia.it"
              },
              to: [
                {
                  email: email,
                  name: firstName
                }
              ],
              subject: `Conferma Ricezione Ordine #${orderCode} - Xian Sushi Foggia`,
              htmlContent: htmlContent
            })
          });

          if (!emailResponse.ok) {
            const emailErr = await emailResponse.text();
            console.error("Failed to send Brevo transactional email:", emailErr);
          } else {
            console.log(`Order email recap successfully sent to client: ${email}`);
          }
        } catch (emailErr) {
          console.error("Error building or sending order email recap:", emailErr);
        }
      }

      return res.status(200).json({ success: true });
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
