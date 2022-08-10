import { ImportConfig } from '../../domain/ImportConfig'

class RequerySoldData {
  [property: string]: any
  constructor({
    importConfigRepository,
    responseFormatter,
    logger,
    oDataQueryHelper,
    bridgeClient,
  }: any) {
    this.importConfigRepository = importConfigRepository
    this.responseFormatter = responseFormatter
    this.logger = logger
    this.oDataQueryHelper = oDataQueryHelper
    this.bridgeClient = bridgeClient
  }

  async execute(request: any, response: any) {
    const {
      params: { ImportId },
      body: { listingKeys = null },
    } = request

    try {
      this.validateRequest(request)
    } catch (error) {
      this.logger.error({
        message: 'Invalid Request',
        ImportId,
        listingKeys,
        error,
      })

      return this.responseFormatter.badRequest(response)
    }

    let importConfigData
    try {
      importConfigData = await this.importConfigRepository.getByLegacyImportId(
        ImportId
      )
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching import config',
        ImportId,
        listingKeys,
        error,
      })

      return this.responseFormatter.internalServerError(response)
    }

    let soldData
    try {
      soldData = await this.getSoldDataByListingKey(
        importConfigData,
        listingKeys
      )
    } catch (error) {
      this.logger.error({
        message: 'Error while fetching sold data',
        ImportId,
        listingKeys,
        error,
      })
    }
  }

  async getSoldDataByListingKey(
    importConfigData: ImportConfig,
    listingKeys: Array<string>
  ) {
    try {
      const { ProviderType } = importConfigData

      if (ProviderType === 'webapibridge') {
        return await this.bridgeClient.getBridgeSoldDataByListingKey(
          importConfigData,
          listingKeys
        )
      }
    } catch (error) {
      throw error
    }
  }

  validateRequest(request: any) {
    const {
      params: { ImportId },
      body: { listingKeys },
    } = request

    if (!ImportId || !listingKeys.length) {
      throw new Error('Invalid Request')
    }
  }
}

export default RequerySoldData
