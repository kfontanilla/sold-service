class GetImportConfigs {
  private readonly importConfigRepository
  private readonly responseFormatter
  private readonly logger
  constructor({ importConfigRepository, responseFormatter, logger }: any) {
    this.importConfigRepository = importConfigRepository
    this.responseFormatter = responseFormatter
    this.logger = logger
  }

  async execute(req: any, res: any) {
    try {
      const importConfig = await this.importConfigRepository.getAll()

      this.logger.info({
        message: 'Success fetch of import config',
        details: importConfig,
      })

      return this.responseFormatter.success(res, importConfig)
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching import config',
        details: error,
      })
    }
  }
}

export default GetImportConfigs
