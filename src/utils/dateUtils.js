function calcularDataDevolucao(dataInicio) {
    const data = new Date(dataInicio);
    let diasAdicionados = 0;

    while (diasAdicionados < 5) {
        data.setDate(data.getDate() + 1);
        if (data.getDay() !== 0 && data.getDay() !== 6) {
            diasAdicionados++;
        }
    }

    if (data.getDay() === 6) data.setDate(data.getDate() + 2); // Sábado para Segunda-feira
    if (data.getDay() === 0) data.setDate(data.getDate() + 1); // Domingo para Segunda-feira

    return data;
}

module.exports = {calcularDataDevolucao};
