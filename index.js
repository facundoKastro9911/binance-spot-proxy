const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/:pair", async (req, res) => {
    const pair = req.params.pair.toUpperCase();
    const url = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${pair}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: `Binance API returned ${response.status}`,
                details: data
            });
        }

        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Binance Proxy is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
