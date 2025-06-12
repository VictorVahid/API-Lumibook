const AcademicThesisModel = require("../models/AcademicThesis");

class MongooseAcademicThesisRepository {
  async save(thesisData) {
    return AcademicThesisModel.create(thesisData);
  }

  async findByOpenAlexId(openAlexId) {
    return AcademicThesisModel.findOne({ openAlexId });
  }

  async search(query) {
    return AcademicThesisModel.find({ title: { $regex: query, $options: "i" } });
  }
}

module.exports = MongooseAcademicThesisRepository; 