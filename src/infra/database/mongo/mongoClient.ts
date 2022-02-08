const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/emapta');
class mongoClient {
  async getAll(model: any) {
    const Model = model;
    const response = await Model.find();
    return response;
  }

  async getById(model: any, id: Number) {
    const Model = model;
    const response = await Model.find({ id });
    return response;
  }

  async deleteById(model: any, id: Number) {
    const Model = model;
    const response = await Model.deleteOne({ id });
    return response;
  }
}

export default mongoClient;
