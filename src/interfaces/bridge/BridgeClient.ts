import { ImportConfig } from '../../domain/ImportConfig'

class BridgeClient {
  private readonly httpClient: any

  constructor({ httpClient }: any) {
    this.httpClient = httpClient
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

  buildQueryUrl(ImportConfig: ImportConfig) {
    try {
      if (ImportConfig.AdditionalConfig.sold) {

        const addedResource = ImportConfig.AdditionalConfig.sold.addedResource
        ? '/' + ImportConfig.AdditionalConfig.sold.addedResource
        : ''

        if (
          ImportConfig.extractionType &&
          ImportConfig.extractionType === 'extractincremental'
        ) {

          let dataSearchQuery = new Date()
          console.log(ImportConfig.serviceDetail)
          if(ImportConfig.ModificationTimestamp){
            dataSearchQuery = new Date(Date.parse(ImportConfig.ModificationTimestamp))
          }
          // const dateOnly = new Date(dataSearchQuery)
          console.log(dataSearchQuery.toLocaleDateString())
          console.log(dataSearchQuery.toLocaleTimeString())
          const incrementalSearchQuery = ImportConfig.SearchQuery 


          return (
            ImportConfig.ProviderUrl +
            ImportConfig.AdditionalConfig.sold.type +
            '?access_token=' +
            ImportConfig.ProviderPassword +
            '&$filter=' +
            encodeURI(incrementalSearchQuery) +
            '&$top=200'
          )

        }
        if (typeof ImportConfig.nextLink === 'undefined') {

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
        }

        return ImportConfig.nextLink
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = BridgeClient
