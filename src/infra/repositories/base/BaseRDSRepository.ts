export class BaseRDSRepository {
  model: any
  constructor(model: any) {
    this.model = model
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
   * Gets a single entry based on the search options provided. If no options was supplied, this will return the FIRST row in the table.
   *
   * @param {Object} [options = null] The search options. If null, this will return the FIRST row in the table.
   */
  async getOne(options: object | null = null) {
    if (options) {
      return this.model.findOne(options)
    }
    return this.model.findOne()
  }

  /**
   * Gets the entry by id
   *
   * @return {Promise<object|null>} Will return the first matching entry, or null if not found
   */
  async getById(id: number): Promise<object | null> {
    return this.getOne({ where: { id } })
  }

  async save(doc: any) {
    try {
      const saveData = await this.model.create(doc)

      return saveData
    } catch (error) {
      throw error
    }
  }
}
