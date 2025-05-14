class Notification {
  constructor({ type, recipient, content, status = 'pending' }) {
    this.type = type;
    this.recipient = recipient;
    this.content = content;
    this.status = status;
    this.createdAt = new Date();
  }

  markAsSent() {
    this.status = 'sent';
    this.sentAt = new Date();
  }

  markAsFailed() {
    this.status = 'failed';
  }
}

module.exports = Notification;