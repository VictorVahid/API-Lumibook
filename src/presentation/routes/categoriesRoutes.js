const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

// Lista vasta de categorias em português
const categorias = [
  "Romance", "Aventura", "Biografia", "Ciência", "Tecnologia", "História", "Infantil", "Ficção Científica", "Fantasia", "Poesia", "Didático", "Autoajuda", "Artes", "Religião", "Saúde", "Esportes", "Negócios", "Direito", "Política", "Educação", "Gastronomia", "Viagem", "Humor", "Drama", "Suspense", "Terror", "Música", "Quadrinhos", "Ensino Médio", "Ensino Fundamental", "Psicologia", "Filosofia", "Ecologia", "Engenharia", "Matemática", "Física", "Química", "Medicina", "Administração", "Contabilidade", "Marketing", "Comunicação", "Moda", "Arquitetura", "Design", "Computação", "Programação", "Literatura Brasileira", "Literatura Estrangeira", "Contos", "Crônicas", "Ensaios", "Mitologia", "Genealogia", "Outros"
];

router.get("/", CategoryController.listCategories);
router.post("/", CategoryController.createCategory);
router.get("/:id", CategoryController.getCategory);

module.exports = router; 