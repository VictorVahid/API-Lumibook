// Script para criar um usuário admin manualmente no banco MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/infrastructure/mongoose/models/UserSchema');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = 'admin@universitas.edu.br';
    const senha = 'admin123!'; // Altere para uma senha forte antes de rodar em produção
    const nome = 'Administrador';

    // Verifica se já existe admin
    const existe = await User.findOne({ email, role: 'admin' });
    if (existe) {
      console.log('Já existe um admin cadastrado com este email.');
      process.exit(0);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await User.create({
      nome,
      email,
      senhaHash,
      role: 'admin',
      statusConta: 'ativo'
    });
    console.log('Usuário admin criado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar admin:', err);
    process.exit(1);
  }
}

seedAdmin(); 