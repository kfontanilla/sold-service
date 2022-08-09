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
  async getAll(options: any) {
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
  async getById(Id: number): Promise<object | null> {
    return this.getOne({ where: { Id } })
  }

  async save(doc: any) {
    try {
      const saveData = await this.model.create(doc)

      return saveData
    } catch (error) {
      throw error
    }
  }

  /**
   * Insert many data into table
   * @param {object[]} dataSet The data set that will be inserted to table
   *
   * @return {Promise<object|null>} Will return the query result.
   */
  async insertMany(dataSet: object[]): Promise<object | null> {
    try {
      return this.model.bulkCreate(dataSet)
    } catch (error) {
      throw error
    }
  }

    /**
   * Insert or Update data into table
   * @param {object[]} dataSet The data set that will be inserted to table
   * 
   * @return {Promise<object|null>} Will return the query result.
   */

     async upsert(dataSet: any): Promise<object | null> {
      try {
        return await this.model.upsert(dataSet)
      } catch (error) {
        throw error
      }
    }

  /**
   * Insert or Update data into table
   * @param {object[]} dataSet The data set that will be inserted to table
   * 
   * @return {Promise<object|null>} Will return the query result.
   */

  async upsertMany(dataSet: object[], optionsField: object): Promise<object | null> {
    try {
      return await this.model.bulkCreate(dataSet, optionsField)
    } catch (error) {
      throw error
    }
  }


    /**
   * Gets count all entries based on the search options provided. If no options was supplied, this will return ALL rows in the table.
   *
   * @param {Object} [options = null] The search options. If null, this will return ALL rows in the table.
   */
     async getCount(options: any) {
      if (options) {
        return this.model.count(options)
      }
      return this.model.findAll()
    }


}
