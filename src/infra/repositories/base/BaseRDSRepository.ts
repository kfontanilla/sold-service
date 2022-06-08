export class BaseRDSRepository {
  model: any
  domain: any
  constructor(model: any, domain: any) {
    this.model = model
    this.domain = domain
  }

  /**
   * Gets all entries based on the search options provided. If no options was supplied, this will return ALL rows in the table.
   *
   * @param {Object} [options = null] The search options. If null, this will return ALL rows in the table.
   */
  async getAll(options = null) {
    if (options) {
      return this.model.findAll(options)
    }
    return this.model.findAll()
  }

  /**
   * Gets all entries based on the id provided. If no id was supplied, this will return ALL rows in the table.
   *
   * @param {Number} id The search id. If null, this will return ALL rows in the table.
   */
  async getById(id: Number) {
    return this.model.find({
      where: {
        id,
      },
    })
  }

  /**
   * Gets all entries based on the id provided. If no id was supplied, this will return ALL rows in the table.
   *
   * @param {Number} id The search id. If null, this will return ALL rows in the table.
   */
  async deleteById(id: Number) {
    return this.model.destroy({
      where: {
        id,
      },
    })
  }
}
