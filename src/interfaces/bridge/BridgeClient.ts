class BridgeClient {
  private readonly httpClient: any

  constructor({ httpClient }: any) 
  {
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

      const { data } = await this.httpClient.get(queryUrl,
        options
      )

      return data
    } catch (error) {
      throw error
    }
  }

  buildQueryUrl(ImportConfig: any){
    try {
      return ImportConfig.ProviderUrl + ImportConfig.AdditionalConfig.sold.type + '?access_token=' + ImportConfig.ProviderPassword + '&$filter=' + encodeURI(ImportConfig.AdditionalConfig.sold.search)
    } catch (error) {
      throw error
    }
  }
}

module.exports = BridgeClient
