const express = require("express");
const router = express.Router();

// Catalogar nova obra
router.post("/admin/obras/catalogar", (req, res) => {
  // Aqui você salvaria no banco, por enquanto só retorna sucesso
  res.json({ success: true, data: req.body, message: "Obra catalogada com sucesso!" });
});

module.exports = router; 