class GetImportConfig {
  [property: string]: any
  constructor({ importConfigRepository, responseFormatter, logger }: any) {
    this.importConfigRepository = importConfigRepository
    this.responseFormatter = responseFormatter
    this.logger = logger
  }

  async execute(req: any, res: any) {
    const {
      params: { ImportId },
    } = req
    try {
      const importConfig =
        await this.importConfigRepository.getById(ImportId)

      this.logger.info({
        message: 'Success fetch import config by Import Id',
        importConfig,
        ImportId,
      })

      return this.responseFormatter.success(res, importConfig)
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching import config by Import Id',
        error,
        ImportId,
      })
    }
  }

  async get(ImportId: any) {
    try {
      const importConfig =
        await this.importConfigRepository.getById(ImportId)

      // this.logger.info({
      //   message: 'Success fetch import config by Legacy import Id',
      //   importConfig,
      //   ImportId,
      // })

      return importConfig
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching import config by Import Id',
        error,
        ImportId,
      })
    }
  }
}

export default GetImportConfig
