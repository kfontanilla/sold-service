import { ImportConfig } from '../../domain/ImportConfig'

class BridgeClient {
  [property: string]: any
  constructor({ httpClient, oDataQueryHelper }: any) {
    this.httpClient = httpClient
    this.oDataQueryHelper = oDataQueryHelper
  }

  // get sold by LegacyImportId
  async getSolds(importConfig: ImportConfig) {
    try {
      const queryUrl = importConfig.nextLink

      const options = {
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }

      const { data } = await this.httpClient.get(queryUrl, options)

      return data
    } catch (error) {
      throw error
    }
  }

  async getBridgeSoldDataByListingKey(
    importConfigData: ImportConfig,
    listingKeys: Array<string>
  ): Promise<any> {
    const { ProviderUrl, ProviderPassword } = importConfigData
    try {
      const oDataQueryFilter =
        this.oDataQueryHelper.createMultipleInQueryFilter(
          'ListingKey',
          listingKeys
        )

      const options = {
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          Authorization: `Bearer ${ProviderPassword}`,
        },
      }

      const { data } = await this.httpClient.get(
        `${ProviderUrl}Property${oDataQueryFilter}`,
        options
      )
      
      return data
    } catch (error) {
      throw error
    }
  }

  buildQueryUrl(ImportConfig: ImportConfig) {
    try {
      if (
        ImportConfig.AdditionalConfig.sold &&
        typeof ImportConfig.nextLink === 'undefined'
      ) {
        const addedResource = ImportConfig.AdditionalConfig.sold.addedResource
          ? '/' + ImportConfig.AdditionalConfig.sold.addedResource
          : ''

        return (
          ImportConfig.ProviderUrl +
          ImportConfig.AdditionalConfig.sold.type +
          addedResource +
          '?access_token=' +
          ImportConfig.ProviderPassword +
          '&$filter=' +
          encodeURI(ImportConfig.SearchQuery) +
          '&$top=' +
          ImportConfig.RequestLimit
        )
      } else {
        return ImportConfig.nextLink
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = BridgeClient
