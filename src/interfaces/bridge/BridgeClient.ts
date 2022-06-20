class BridgeClient {
  private readonly httpClient: any

  constructor({ httpClient }: any) 
  {
    this.httpClient = httpClient
  }

  // get sold by LegacyImportId
  async getSolds(LegacyImportId: string) {
    try {
      // const importConfig = await this.getImportConfig(LegacyImportId)

      // console.log(importConfig.AdditionalConfig)
      const options = {
        headers: {
          Authorization: authorization,
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }
 

      // return data
    } catch (error) {
      throw error
    }
  }

  // get DB data from import_config
  // async getImportConfig(LegacyImportId: string) {

  //   console.log(LegacyImportId)
  //   const data = await this.importConfigRepository.getOne({LegacyImportId: LegacyImportId});

  //   return data
  // }

  async buildQueryUrl(ImportConfig: any){

  }
}

module.exports = BridgeClient
