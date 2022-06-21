class GetImportConfig {
  importConfigRepository: any
  private readonly responseFormatter
  constructor({ importConfigRepository, responseFormatter }: any) {
    this.importConfigRepository = importConfigRepository
    this.responseFormatter = responseFormatter
  }

  async execute(req: any, res: any) {
    try {
      const {
        params: { LegacyImportId },
      } = req

      console.log('Fetching import config: ', LegacyImportId)
      const data = await this.importConfigRepository.getByLegacyImportId(
        LegacyImportId
      )
      return this.responseFormatter.success(res, data)
    } catch (error) {
      console.log('GET_IMPORT_CONFIG_BY_LEGACYIMPORT_ID_ERROR', error)
    }
  }

  async get(LegacyImportId: any) {
    try {
      console.log('Fetching import config: ', LegacyImportId)
      const data = await this.importConfigRepository.getByLegacyImportId(
        LegacyImportId
      )

      return data
    } catch (error) {
      console.log('GET_IMPORT_CONFIG_BY_LEGACYIMPORT_ID_ERROR', error)
    }
  }
}

export default GetImportConfig
