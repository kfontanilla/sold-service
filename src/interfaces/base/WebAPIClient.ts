import { ImportConfig } from '../../domain/ImportConfig'

class WebAPIClient {
  [property: string]: any

  constructor({ bridgeClient, mlsGridClient, logger }: any) {
    this.bridgeClient = bridgeClient
    this.mlsGridClient = mlsGridClient
    this.logger = logger
  }

  // get sold by LegacyImportId
  async getSolds(importConfig: ImportConfig) {
    try {
      // check the provider type

      switch (importConfig.ProviderType) {
        case 'webapibridge':
          return await this.bridgeClient.getSolds(importConfig)

          break
        case 'mlsgrid':
          return await this.mlsGridClient.getSolds(importConfig)

          break

        default:
          break
      }
    } catch (error) {
      throw error
    }
  }

  buildQueryUrl(importConfig: ImportConfig) {
    try {
      switch (importConfig.ProviderType) {
        case 'webapibridge':
          return this.bridgeClient.buildQueryUrl(importConfig)

          break
        case 'mlsgrid':
          return this.mlsGridClient.buildQueryUrl(importConfig)
          break

        default:
          break
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = WebAPIClient
