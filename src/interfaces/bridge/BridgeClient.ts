class BridgeClient {
  private readonly httpClient: any

  constructor({ httpClient }: any) {
    this.httpClient = httpClient
  }

  // get sold by LegacyImportId
  async getSolds(importConfig: any) {
    try {
      const queryUrl = this.buildQueryUrl(importConfig)

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

  buildQueryUrl(ImportConfig: any) {
    try {

      if(ImportConfig.AdditionalConfig.sold){
        const addedResource = ( ImportConfig.AdditionalConfig.sold.addedResource ? '/' + ImportConfig.AdditionalConfig.sold.addedResource : '' )
        return (
          ImportConfig.ProviderUrl +
          ImportConfig.AdditionalConfig.sold.type +
          addedResource +
          '?access_token=' +
          ImportConfig.ProviderPassword +
          '&$filter=' +
          encodeURI(ImportConfig.SearchQuery) +
          '&$top=' + ImportConfig.RequestLimit
        )
      }
      
    } catch (error) {
      throw error
    }
  }
}

module.exports = BridgeClient
