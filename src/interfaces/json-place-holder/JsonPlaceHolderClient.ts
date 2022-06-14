class JsonPlaceHolderClient {
  private readonly protocol = 'https'
  private readonly hostname = 'jsonplaceholder.typicode.com'
  private readonly basePath = `${this.protocol}://${this.hostname}`
  private readonly httpClient: any;

  constructor({ httpClient }: any) {
    this.httpClient = httpClient
  }

  async getUsers() {
    const { data } = await this.httpClient.get(
      `${this.basePath}/users`
    )

    return data
  }

  async getPhotos(albumId: number) {
    const options = { params: { albumId } }
    const { data } = await this.httpClient.get(
      `${this.basePath}/photos`,
      options
    )

    return data
  }
}

module.exports = JsonPlaceHolderClient
