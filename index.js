const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Lista de símbolos válidos permitidos
const PARES_PERMITIDOS = ["BTCARS", "ETHARS", "USDTARS", "BNBARS", "SOLARS"];

app.get("/:pair", async (req, res) => {
  const pair = req.params.pair.toUpperCase();

  if (!PARES_PERMITIDOS.includes(pair)) {
    return res.status(400).json({
      error: "Par no permitido por este proxy.",
      permitido: PARES_PERMITIDOS
    });
  }

  const url = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${pair}`;
  console.log(`📡 Fetching SPOT data for: ${pair}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ Binance error ${response.status}:`, data);
      return res.status(response.status).json({
        error: `Binance API returned ${response.status}`,
        details: data
      });
    }

    return res.json(data);
  } catch (err) {
    console.error("❌ Proxy server error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Binance SPOT Proxy (ARS only) is running");
});

app.listen(PORT, () => {
  console.log(`🚀 ARS proxy activo en puerto ${PORT}`);
});
