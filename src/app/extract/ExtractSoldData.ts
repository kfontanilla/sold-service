const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class ExtractSoldData {
  private readonly mlsGridClient
  private readonly responseFormatter
  constructor({ mlsGridClient, responseFormatter }: any) {
    this.mlsGridClient = mlsGridClient
    this.responseFormatter = responseFormatter
  }

  async execute(request: any, response: any) {
    try {
      const {
        params: { providerName },
      } = request

      const soldData = await this.getSoldData(providerName)

      this.responseFormatter.success(response, soldData)
    } catch (error: any) {
      console.log('GET_SOLD_DATA_ERROR', error)
      const { message } = error

      if (message === INVALID_PATH_PARAMETER_ERROR) {
        this.responseFormatter.badRequest(response);
      }

      this.responseFormatter.internalServerError(response)
    }
  }

  async getSoldData(providerName: 'mlsGrid') {
    if (providerName === 'mlsGrid') {
      return await this.mlsGridClient.getSolds()
    }

    throw new Error(INVALID_PATH_PARAMETER_ERROR)
  }
}

export default ExtractSoldData
