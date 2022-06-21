class GetImportConfig {
  private readonly importConfigRepository
  private readonly responseFormatter
  private readonly logger
  constructor({ importConfigRepository, responseFormatter, logger }: any) {
    this.importConfigRepository = importConfigRepository
    this.responseFormatter = responseFormatter
    this.logger = logger
  }

  async execute(req: any, res: any) {
    const {
      params: { LegacyImportId },
    } = req
    try {
      const importConfig =
        await this.importConfigRepository.getByLegacyImportId(LegacyImportId)

      this.logger.info({
        message: 'Success fetch import config by Legacy import Id',
        importConfig,
        LegacyImportId,
      })

      return this.responseFormatter.success(res, importConfig)
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching import config by Legacy Import Id',
        error,
        LegacyImportId,
      })
    }
  }

  async get(LegacyImportId: any) {
    try {
      const importConfig =
        await this.importConfigRepository.getByLegacyImportId(LegacyImportId)

      // this.logger.info({
      //   message: 'Success fetch import config by Legacy import Id',
      //   importConfig,
      //   LegacyImportId,
      // })

      return importConfig
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching import config by Legacy Import Id',
        error,
        LegacyImportId,
      })
    }
  }
}

export default GetImportConfig
