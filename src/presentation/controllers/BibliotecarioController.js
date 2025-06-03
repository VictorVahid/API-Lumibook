// Controller responsável pelo cadastro de bibliotecários (restrito a admin)
const { CreateUser } = require('../../usecases/userUseCases');
const MongooseUserRepo = require('../../infrastructure/mongoose/repositories/MongooseUserRepository');

const userRepo = new MongooseUserRepo();
const createUserUC = new CreateUser(userRepo);

function padronizarUsuario(user) {
  return {
    id: user.id || user._id || null,
    nome: user.nome || null,
    email: user.email || null,
    papel: user.papel || user.role || null,
    matricula: user.matricula || null,
    tipoLogin: user.tipoLogin || null,
    avatarUrl: user.avatarUrl || user.avatar || null,
    statusConta: user.statusConta || null,
    telefone: user.telefone || null
  };
}

exports.createBibliotecario = async (req, res) => {
  try {
    // Força o papel para bibliotecario independentemente do que vier no body
    const result = await createUserUC.execute({ ...req.body, role: 'bibliotecario' });
    return res.status(201).json({
      id: result.id || result._id,
      nome: result.nome,
      email: result.email,
      papel: 'bibliotecario'
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}; 