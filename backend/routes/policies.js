// routes/policies.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/get-policies", async (req, res) => {
  try {
    const response = await axios.get("https://api.example.com/government-policies");
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

module.exports = router;
