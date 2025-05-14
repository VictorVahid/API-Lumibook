const SendNotification = require('./sendNotification');

class SendReminder {
  constructor(sendNotification = new SendNotification()) {
    this.sendNotification = sendNotification;
  }

  async execute(loan) {
    return this.sendNotification.execute('loanReminder', loan.user.email, {
      userName: loan.user.name,
      itemTitle: loan.item.title,
      dueDate: loan.dueDate.toLocaleDateString()
    });
  }
}

module.exports = SendReminder;