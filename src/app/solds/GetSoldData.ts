const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class GetSoldData {
  private readonly mlsGridClient
  private readonly bridgeClient
  private readonly responseFormatter
  constructor({ mlsGridClient, responseFormatter, bridgeClient }: any) {
    this.mlsGridClient = mlsGridClient
    this.bridgeClient = bridgeClient
    this.responseFormatter = responseFormatter
  }

  async execute(request: any, response: any) {
    try {
      const {
        params: { providerType },
      } = request

      const soldData = await this.getSoldDataByProviderType(providerType)

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

  async getSoldDataByProviderType(providerType: 'mlsGrid') {
    if (providerType === 'mlsGrid') {
      return await this.mlsGridClient.getSolds()
    }

    throw new Error(INVALID_PATH_PARAMETER_ERROR)
  }

  async getSoldDataByImportId(LegacyImportId: string) {
    return await this.bridgeClient.getSolds(LegacyImportId)
  }
}

export default GetSoldData
