// Modelo de domínio para Notificação (ex: lembretes por e-mail)
class Notification {
  constructor({ type, recipient, content, status = 'pending' }) {
    this.type = type;
    this.recipient = recipient;
    this.content = content;
    this.status = status;
    this.createdAt = new Date();
  }

  // Marca a notificação como enviada
  markAsSent() {
    this.status = 'sent';
    this.sentAt = new Date();
  }

  // Marca a notificação como falhada
  markAsFailed() {
    this.status = 'failed';
  }
}

module.exports = Notification;