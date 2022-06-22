const { INVALID_PATH_PARAMETER_ERROR } = require('src/domain/Errors')

class GetSoldData {
  [property: string]: any
  constructor({ mlsGridClient, responseFormatter, logger }: any) {
    this.mlsGridClient = mlsGridClient
    this.responseFormatter = responseFormatter
    this.logger = logger
  }

  async execute(request: any, response: any) {
    const {
      params: { providerType },
    } = request

    try {
      const soldData = await this.getSoldData(providerType)

      this.logger.info({
        message: 'Success fetch of sold data from data provider',
        providerType,
        soldData,
      })

      return this.responseFormatter.success(response, soldData)
    } catch (error: any) {
      this.logger.error({
        message: 'Error while fetching sold data from data provider',
        providerType,
        error,
      })

      const { message } = error

      if (message === INVALID_PATH_PARAMETER_ERROR) {
        return this.responseFormatter.badRequest(response)
      }

      return this.responseFormatter.internalServerError(response)
    }
  }

  async getSoldData(providerType: 'mlsGrid') {
    if (providerType === 'mlsGrid') {
      return await this.mlsGridClient.getSolds()
    }

    throw new Error(INVALID_PATH_PARAMETER_ERROR)
  }
}

// export default GetSoldData
