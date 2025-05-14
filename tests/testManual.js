require('dotenv').config();
const EmailService = require('../src/infrastructure/services/EmailService');

console.log('Variáveis carregadas:', process.env.EMAIL_HOST ? 'OK' : 'FALHA');

async function testMailtrapConnection() {
  console.log('\n=== Teste de Configuração Mailtrap ===');
  console.log('Host:', process.env.EMAIL_HOST);
  console.log('Port:', process.env.EMAIL_PORT);
  console.log('User:', process.env.EMAIL_USER ? '*****' : 'NÃO CONFIGURADO');
  console.log('Pass:', process.env.EMAIL_PASSWORD ? '*****' : 'NÃO CONFIGURADO');

  try {
    console.log('\nVerificando conexão com Mailtrap...');
    await EmailService.transporter.verify();
    console.log('✅ Conexão com Mailtrap estabelecida com sucesso!');

    console.log('\nEnviando e-mail de teste...');
    await EmailService.send('loanReminder', 'eduaguiaar1006@gmail.com', {
      userName: 'Usuário Teste',
      itemTitle: 'Livro de Exemplo',
      dueDate: new Date().toLocaleDateString()
    });
    
    console.log('\n🎉 E-mail enviado com sucesso!');
    console.log('Verifique sua caixa Mailtrap para ver o e-mail recebido.');
  } catch (error) {
    console.error('\n❌ Erro durante o teste:');
    console.error('Código:', error.code);
    console.error('Mensagem:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔑 Solução:');
      console.log('1. Verifique se EMAIL_USER e EMAIL_PASSWORD estão corretos no .env');
      console.log('2. Confira as credenciais no painel do Mailtrap → SMTP Settings');
      console.log('3. Certifique-se que o arquivo .env está sendo carregado (require(\'dotenv\').config())');
    }
  }
}

testMailtrapConnection();