const publisherMapping = {
    // Editoras existentes nos livros
    "CreateSpace Independent Publishing Platform": "CreateSpace Independent Publishing Platform",
    "PEARSON DISTRIBUCIÓN": "PEARSON DISTRIBUCIÓN",
    "Agir": "Agir",
    // Editoras adicionais comuns
    "Editora Record": "Editora Record",
    "Editora Companhia das Letras": "Editora Companhia das Letras",
    "Editora Rocco": "Editora Rocco",
    "Editora Intrínseca": "Editora Intrínseca",
    "Editora Planeta": "Editora Planeta"
};

function getPublisherName(publisherId) {
    // Se o publisherId já for o nome da editora, retorna ele mesmo
    if (publisherMapping[publisherId]) {
        return publisherId;
    }
    return publisherMapping[publisherId] || "Editora não especificada";
}

module.exports = {
    publisherMapping,
    getPublisherName
}; 