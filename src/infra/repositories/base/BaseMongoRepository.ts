export class BaseMongoRepository {
  client: any;
  model: string;
  constructor(client: any, model: string) {
    this.client = client;
    this.model = model;
  }

  async getAll() {
    return await this.client.getAll(this.model);
  }

  async getById(id: Number) {
    return await this.client.getById(this.model, id);
  }

  async deleteById(id: Number) {
    return await this.client.deleteById(this.model, id);
  }
}