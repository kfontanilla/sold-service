import { ImportConfig } from "../../domain/ImportConfig"

class MlsGridClient {
  private readonly httpClient: any

  constructor({ httpClient }: any) {
    this.httpClient = httpClient
  }

  // get sold by LegacyImportId
  async getSolds(importConfig: ImportConfig) {
    try {
      const queryUrl = importConfig.nextLink
      const authorization = importConfig.ProviderPassword
      const options = {
        headers: {
          'Authorization' : 'Bearer ' + authorization,
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
        let filterQuery = 'MlgCanView eq true and ' + ImportConfig.SearchQuery
        // check if modification timestamp is present 
        if(typeof ImportConfig.ModificationTimestamp !== 'undefined'){
          filterQuery += ' and ModificationTimestamp gt ' + ImportConfig.ModificationTimestamp
        }

        return (
          ImportConfig.ProviderUrl +
          ImportConfig.AdditionalConfig.sold.type +
          '?$count=true&$filter=' +
          encodeURI(filterQuery) +
          '&$top=' +
          ImportConfig.RequestLimit
        )
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = MlsGridClient
