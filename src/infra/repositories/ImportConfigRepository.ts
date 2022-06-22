import { BaseRDSRepository } from './base/BaseRDSRepository'

class ImportConfigRepository extends BaseRDSRepository {
  constructor({ ImportConfigModel }: any) {
    super(ImportConfigModel)
  }

  async getByLegacyImportId(LegacyImportId: string): Promise<object | null> {
    return this.getOne({ where: { LegacyImportId } })
  }
}

module.exports = ImportConfigRepository
