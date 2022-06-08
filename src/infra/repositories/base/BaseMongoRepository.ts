export class BaseMongoRepository {
  client: any;
  model: string;
  constructor(client: any, model: string) {
    this.client = client;
    this.model = model;
  }

  /**
   * Gets all entries based on the search options provided. If no options was supplied, this will return ALL rows in the table.
   */
  async getAll() {
    return await this.client.getAll(this.model);
  }

  /**
   * Gets all entries based on the id provided. If no id was supplied, this will return ALL rows in the table.
   *
   * @param {Number} id The search id. If null, this will return ALL rows in the table.
   */
  async getById(id: Number) {
    return await this.client.getById(this.model, id);
  }

  /**
   * Delete entry based on id provided
   *
   * @param {Number} id The search id. If null, this will return ALL rows in the table.
   */
  async deleteById(id: Number) {
    return await this.client.deleteById(this.model, id);
  }
}