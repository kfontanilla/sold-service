import axios from 'axios'

class HttpClient {
  [property: string]: any
  constructor({ logger, }: any) {
    this.logger = logger
  }

  async get(url: string, options: object): Promise<any> {
    this.logger.info({
      message: 'Sending GET Request',
      url,
      ...options,
    })

    return axios({
      method: 'get',
      url,
      ...options,
    })
  }

  async post(url: string, options: object): Promise<any> {
    this.logger.info({
      message: 'Sending POST Request',
      url,
      ...options,
    })

    return axios({
      method: 'post',
      url,
      ...options,
    })
  }
}

module.exports = HttpClient
