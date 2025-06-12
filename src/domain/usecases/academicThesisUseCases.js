class SaveAcademicThesis {
  constructor(repo) {
    this.repo = repo;
  }

  async execute(thesisData) {
    const exists = await this.repo.findByOpenAlexId(thesisData.openAlexId);
    if (exists) return exists;
    return this.repo.save(thesisData);
  }
}

class SearchAcademicThesis {
  constructor(repo) {
    this.repo = repo;
  }

  async execute(query) {
    return this.repo.search(query);
  }
}

module.exports = {
  SaveAcademicThesis,
  SearchAcademicThesis,
}; 