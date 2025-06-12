const express = require("express");
const AcademicThesisController = require("../controllers/AcademicThesisController");
const router = express.Router();

// Busca autocomplete no OpenAlex
router.get("/search-openalex", AcademicThesisController.searchOpenAlex);

// Salva uma tese buscada do OpenAlex no banco local
router.post("/", AcademicThesisController.saveThesis);

// Busca teses salvas localmente
router.get("/", AcademicThesisController.searchLocal);

module.exports = router; 