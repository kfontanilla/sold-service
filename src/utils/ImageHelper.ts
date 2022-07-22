import fetch from 'node-fetch'

class ImageHelper {
  async createImageFileFromImageUrl(imageUrl: string) {
    const res: any = await fetch(imageUrl)
    return await res.buffer()
  }
}

module.exports = ImageHelper