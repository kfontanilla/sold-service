import { BaseRDSRepository } from './base/BaseRDSRepository';

class ImportConfigRepository extends BaseRDSRepository {
  constructor({ ImportConfigModel }: any) {
    super(ImportConfigModel);
  }

  
  async getByLegacyImportId(LegacyImportId: number): Promise<object | null> {
    return this.getOne({ where: { LegacyImportId } })
  }
}

module.exports = ImportConfigRepository;
