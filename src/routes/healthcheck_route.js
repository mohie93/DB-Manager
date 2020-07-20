const router = require("express").Router();

router.get("/healthcheck", async (req, res) => {
  const { requestId } = req; // global for try - catch scope
  res.status(200).json({ requestId, message: "ok" });
});

module.exports = router;
