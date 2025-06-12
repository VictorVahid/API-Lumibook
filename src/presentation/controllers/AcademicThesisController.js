const axios = require("axios");
const MongooseAcademicThesisRepository = require("../../infrastructure/mongoose/repositories/MongooseAcademicThesisRepository");
const { SaveAcademicThesis, SearchAcademicThesis } = require("../../domain/usecases/academicThesisUseCases");

const repo = new MongooseAcademicThesisRepository();
const saveThesisUC = new SaveAcademicThesis(repo);
const searchThesisUC = new SearchAcademicThesis(repo);

exports.searchOpenAlex = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Query 'q' obrigatória" });

  try {
    const response = await axios.get('https://api.openalex.org/works', {
      params: {
        filter: `type:dissertation,title.search:${q}`,
        per_page: 10
      }
    });

    const resultados = (response.data.results || []).map(item => ({
      openAlexId: item.id,
      title: item.title,
      authors: item.authorships?.map(a => a.author.display_name) || [],
      year: item.publication_year,
      url: item.primary_location?.source?.url || item.primary_location?.url,
      type: item.type,
      source: item.primary_location?.source?.display_name,
      extra: item
    }));

    res.json(resultados);
  } catch (e) {
    res.status(500).json({ message: "Erro ao buscar teses acadêmicas", error: e.message });
  }
};

exports.saveThesis = async (req, res) => {
  try {
    const thesisData = req.body;
    const saved = await saveThesisUC.execute(thesisData);
    res.status(201).json(saved);
  } catch (e) {
    res.status(500).json({ message: "Erro ao salvar tese", error: e.message });
  }
};

exports.searchLocal = async (req, res) => {
  const { q } = req.query;
  try {
    const results = await searchThesisUC.execute(q || "");
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: "Erro ao buscar teses locais", error: e.message });
  }
}; 