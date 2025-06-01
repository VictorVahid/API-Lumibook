const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");
const bcrypt = require('bcryptjs');

const userRepo = new MongooseUserRepo();

exports.login = async (req, res) => {
  // Certifique-se de que o body parser está habilitado no app.js/server.js
  // app.use(express.json());

  const { identificador, senha } = req.body;
  if (!identificador || !senha) {
    return res.status(400).json({ error: "Identificador e senha são obrigatórios" });
  }

  let user;
  if (identificador.includes('@')) {
    user = await userRepo.findByEmail(identificador);
  } else {
    user = await userRepo.findByMatricula(identificador);
  }

  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senhaHash);
  if (!senhaCorreta) {
    return res.status(400).json({ error: "Senha inválida" });
  }

  // Retorne os dados do usuário (adicione token JWT se desejar)
  return res.json({
    id: user.id || user._id,
    nome: user.nome,
    email: user.email,
    papel: user.role || user.papel,
    matricula: user.matricula
    // token: "TOKEN_JWT_AQUI"
  });
}; 