const {
  MLS_GRID_PROTOCOL: protocol,
  MLS_GRID_HOSTNAME: hostname,
  MLS_GRID_AUTHORIZATION: authorization,
} = process.env

class MlsGridClient {
  private readonly basePath = `${protocol}://${hostname}`
  private readonly httpClient: any

  constructor({ httpClient }: any) {
    this.httpClient = httpClient
  }

  async getSolds() {
    try {
      const options = {
        headers: {
          Authorization: authorization,
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }

      const { data } = await this.httpClient.get(
        `${this.basePath}/Property?$filter=OriginatingSystemName eq 'mfrmls' and StandardStatus eq 'Closed'&$top=50&$count=true&$select=MlsStatus`,
        options
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

module.exports = MlsGridClient
