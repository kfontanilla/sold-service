const axios = require('axios');

class JsonPlaceHolderClient {
  readonly protocol = 'https';
  readonly hostname = 'jsonplaceholder.typicode.com';

  async getUsers() {
    const { data } = await axios.get(
      `${this.protocol}://${this.hostname}/users`
    );
    
    return data;
  }

  async getPhotos(albumId: number) {
    const options = { params: { albumId } };
    const { data } = await axios.get(
      `${this.protocol}://${this.hostname}/photos`,
      options
    );

    return data;
  }
}

module.exports = JsonPlaceHolderClient;
