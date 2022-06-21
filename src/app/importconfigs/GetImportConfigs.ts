class GetImportConfigs {
  importConfigRepository: any
  private readonly responseFormatter
  constructor({ importConfigRepository, responseFormatter }: any) {
    this.importConfigRepository = importConfigRepository
    this.responseFormatter = responseFormatter
  }

  async execute(req: any, res: any) {
    try {
      const data = await this.importConfigRepository.getAll()
      return this.responseFormatter.success(res, data)
    } catch (error) {
      console.log('GET_IMPORT_CONFIGS_ERROR', error)
    }
  }
}

export default GetImportConfigs
