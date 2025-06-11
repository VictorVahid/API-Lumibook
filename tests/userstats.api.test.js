const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

// Ajuste: use um userId válido do seu banco de dados de teste
const userId = process.env.TEST_USER_ID || "000000000000000000000001";

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("API de Estatísticas do Usuário", () => {
  it("deve retornar todos os campos esperados no /users/:id/stats", async () => {
    const res = await request(app).get(`/users/${userId}/stats`);
    expect(res.statusCode).toBe(200);
    const body = res.body;
    // Checa se é objeto
    expect(typeof body).toBe("object");
    // Checa campos principais
    expect(typeof body.livrosDisponiveis).toBe("number");
    expect(typeof body.limiteConcorrente).toBe("number");
    expect(typeof body.livrosEmprestados).toBe("number");
    expect(typeof body.reservasRealizadas).toBe("number");
    expect(typeof body.atrasos).toBe("number");
    expect(Array.isArray(body.emprestimosAtrasados)).toBe(true);
    expect(Array.isArray(body.reservas)).toBe(true);
    expect(typeof body.multasPendentes).toBe("number");
    expect(typeof body.fonte).toBe("string");
    expect(typeof body.ultimaAtualizacao).toBe("string");
    // bibliografiasGerenciadas pode ser opcional
    if (body.bibliografiasGerenciadas !== undefined) {
      expect(typeof body.bibliografiasGerenciadas).toBe("number");
    }
    // Arrays nunca nulos
    expect(body.emprestimosAtrasados).not.toBeNull();
    expect(body.reservas).not.toBeNull();
    // Datas em formato ISO
    expect(new Date(body.ultimaAtualizacao).toISOString()).toBe(body.ultimaAtualizacao);
    // Checa estrutura dos arrays
    if (body.emprestimosAtrasados.length > 0) {
      const e = body.emprestimosAtrasados[0];
      expect(typeof e.id).toBe("string");
      expect(typeof e.status).toBe("string");
      expect(typeof e.dataEmprestimo).toBe("string");
      expect(typeof e.dataDevolucao).toBe("string");
      expect(typeof e.tituloLivro).toBe("string");
      expect(new Date(e.dataEmprestimo).toISOString()).toBe(e.dataEmprestimo);
    }
    if (body.reservas.length > 0) {
      const r = body.reservas[0];
      expect(typeof r.id).toBe("string");
      expect(typeof r.tituloLivro).toBe("string");
      expect(typeof r.dataReserva).toBe("string");
      expect(typeof r.status).toBe("string");
      expect(new Date(r.dataReserva).toISOString()).toBe(r.dataReserva);
    }
  });
}); 