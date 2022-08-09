import { ImportConfig } from '../../domain/ImportConfig'

class WebAPIClient {
  [property: string]: any

  constructor({ bridgeClient, mlsGridClient, logger }: any) {
    this.bridgeClient = bridgeClient
    this.mlsGridClient = mlsGridClient
    this.logger = logger
  }

  // get sold by LegacyImportId
  async getSolds(ImportConfig: ImportConfig) {
    try {
      // check the provider type

      switch (ImportConfig.ProviderType) {
        case 'webapibridge':
          return await this.bridgeClient.getSolds(ImportConfig)

          break
        case 'mlsgrid':
          return await this.mlsGridClient.getSolds(ImportConfig)

          break

        default:
          break
      }
    } catch (error) {
      throw error
    }
  }

  buildQueryUrl(ImportConfig: ImportConfig) {
    try {
      switch (ImportConfig.ProviderType) {
        case 'webapibridge':
          if (
            ImportConfig.extractionType &&
            ImportConfig.extractionType === 'extractincremental'
          ) {
          } else {
            return this.bridgeClient.buildQueryUrl(ImportConfig)
          }

          break
        case 'mlsgrid':
          return this.mlsGridClient.buildQueryUrl(ImportConfig)
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
