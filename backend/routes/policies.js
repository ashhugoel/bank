const express = require("express");
const router = express.Router();
const bankingPolicies = require('./information');

router.get("/get-policies", async (req, res) => {
  try {
    const response = bankingPolicies;
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

module.exports = router;
