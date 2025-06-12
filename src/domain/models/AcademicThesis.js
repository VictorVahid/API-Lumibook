class AcademicThesis {
  constructor({ openAlexId, title, authors, year, url, type, source, extra }) {
    this.openAlexId = openAlexId;
    this.title = title;
    this.authors = authors;
    this.year = year;
    this.url = url;
    this.type = type;
    this.source = source;
    this.extra = extra;
  }
}

module.exports = AcademicThesis; 