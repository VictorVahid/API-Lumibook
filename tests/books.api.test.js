const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

let bookId;

beforeAll(async () => {
  // Aguarda conexão com o banco de dados (ajuste se necessário)
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("API de Livros", () => {
  it("deve criar um novo livro (POST /api/books)", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({
        titulo: "Livro Teste",
        autores: ["Autor Teste"],
        isbn: "1234567890",
        ano: 2024,
        categoria: "Teste",
        editora: "Editora Teste"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Livro Teste");
    bookId = res.body.id;
  });

  it("deve listar todos os livros (GET /api/books)", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve buscar um livro pelo ID (GET /api/books/:id)", async () => {
    const res = await request(app).get(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(bookId);
  });

  it("deve atualizar um livro (PUT /api/books/:id)", async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send({ titulo: "Livro Teste Atualizado" });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe("Livro Teste Atualizado");
  });

  it("deve deletar um livro (DELETE /api/books/:id)", async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/excluído/i);
  });
}); 