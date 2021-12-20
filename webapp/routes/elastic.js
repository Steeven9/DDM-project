const express = require("express");
const router = express.Router();

/**
 * Redirect to Kibana
 */
router.get("/", async (req, res) => {
  try {
    res.redirect("https://kibana.soulsbros.ch");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
});

module.exports = router;
