const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class ExtractData {
  private readonly bridgeClient
  private readonly responseFormatter
  private readonly getImportConfig
  constructor(
    { bridgeClient, responseFormatter, GetImportConfig }: any
    ) {
    this.bridgeClient = bridgeClient
    this.responseFormatter = responseFormatter
    this.getImportConfig = GetImportConfig
  }

  async execute(request: any, response: any) {
    try {
      const {
        params: { LegacyImportId },
      } = request
      const importData = await this.getImportConfig.getImportData(LegacyImportId)
      // call bridge client interface to extract data from provider
      const soldData = await this.bridgeClient.getSolds(importData)

      return this.responseFormatter.success(response, soldData)
    } catch (error: any) {
      console.log('GET_SOLD_DATA_ERROR', error)
      const { message } = error

      if (message === INVALID_PATH_PARAMETER_ERROR) {
        return this.responseFormatter.badRequest(response)
      }

      return this.responseFormatter.internalServerError(response)
      
    }
  }
}

export default ExtractData
