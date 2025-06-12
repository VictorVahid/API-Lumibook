const UserModel = require("../../infrastructure/mongoose/models/User");
const BookModel = require("../../infrastructure/mongoose/models/Book");
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");
const FineModel = require("../../infrastructure/mongoose/models/Fine");
const AuditLogModel = require("../../infrastructure/mongoose/models/AuditLog");

// Dashboard global para admin
exports.getDashboard = async (req, res) => {
  try {
    // Contagens globais
    const [
      totalUsuarios,
      totalLivros,
      totalEmprestimos,
      totalReservas,
      totalMultas,
      emprestimosAbertos,
      reservasPendentes,
      multasPendentes
    ] = await Promise.all([
      UserModel.countDocuments(),
      BookModel.countDocuments(),
      LoanModel.countDocuments(),
      ReservationModel.countDocuments(),
      FineModel.countDocuments(),
      LoanModel.countDocuments({ status: { $in: ["ativo", "atrasado"] } }),
      ReservationModel.countDocuments({ status: "pendente" }),
      FineModel.countDocuments({ status: "pendente" })
    ]);

    // Atividades recentes (últimos 10 logs, sem dados sensíveis)
    const atividadesRecentes = await AuditLogModel.find({}, {
      usuarioId: 1,
      acao: 1,
      timestamp: 1,
      detalhes: 1
    })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    // Remover dados sensíveis dos detalhes, se houver
    const atividadesSanitizadas = atividadesRecentes.map(log => ({
      id: log._id,
      usuarioId: log.usuarioId,
      acao: log.acao,
      timestamp: log.timestamp,
      detalhes: (log.detalhes && typeof log.detalhes === 'object') ? undefined : log.detalhes
    }));

    res.json({
      sucesso: true,
      dados: {
        totalUsuarios,
        totalLivros,
        totalEmprestimos,
        totalReservas,
        totalMultas,
        emprestimosAbertos,
        reservasPendentes,
        multasPendentes,
        atividadesRecentes: atividadesSanitizadas
      }
    });
  } catch (e) {
    res.status(500).json({ sucesso: false, erro: e.message });
  }
}; 