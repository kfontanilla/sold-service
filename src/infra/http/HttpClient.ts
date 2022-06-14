import axios from 'axios'

class HttpClient {
  constructor() {}

  async get(url: string, options: object): Promise<any> {
    console.log({
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
    console.log({
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
