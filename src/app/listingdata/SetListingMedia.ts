const path = require('path')

class SetListingMedia {
  [property: string]: any
  constructor({
    listingMediaRepository,
    imageHelper,
    publicS3Client,
    logger,
  }: any) {
    this.listingMediaRepository = listingMediaRepository
    this.imageHelper = imageHelper
    this.publicS3Client = publicS3Client
    this.logger = logger
  }

  async set(ImportConfigId: string, ListingData: any) {
    try {
      const proccessedImageData = await this.processMediaListing(
        ListingData,
        ImportConfigId
      )
      const dbData = await this.listingMediaRepository.insertMany(
        proccessedImageData
      )
      this.logger.info({
        message: 'SET_ListingDataResult_SUCCESS',
        ImportConfigId,
        MediaUploaded: dbData.length,
      })
      return dbData
    } catch (error: any) {
      let errDetails = error
      if (error.parent) {
        errDetails = {
          errorName: error.name,
          errorSqlMessage: error.parent.sqlMessage,
          errorCode: error.parent.code,
        }
      }
      this.logger.error({
        message: 'SET_ListingMediaResult_ERROR',
        ImportConfigId,
        errDetails,
      })
    }
  }

  /**
   * Mapped neccessary details to the Raw ListingMediaData from the Provider
   * @param  {Array{}} ListingMediaData
   *
   * @returns {Object} Will return the mapped listing data id.
   */
  async processMediaListing(ListingMediaData: any, ImportConfigId: string) {
    try {
      return await Promise.all(
        ListingMediaData.map(async (item: any) => {
          const mediaItem = this.processImageFields(item, ImportConfigId)
          // missing function is recursive checking for the next valid media
          if (this.checkIfValidImage(mediaItem.ImageFileName)) {
            const s3ObjectUrl = await this.uploadImage(mediaItem)
            if (s3ObjectUrl) {
              mediaItem.OriginalUrl = s3ObjectUrl
            }
          }
          return mediaItem
        })
      )
    } catch (error) {
      this.logger.error({
        message: 'ERROR_processMediaListing',
        error,
      })
    }
  }

  checkIfValidImage(imageFileName: string) {
    return imageFileName.match(/\.(jpg|jpeg|png|gif)$/i)
  }

  processImageFields(listingMediaDataItem: any, ImportConfigId: string) {
    const firstItem = listingMediaDataItem.splice(0, 1)[0]
    const imageUrl = firstItem.MediaURL
    const baseFolder = 'solds'
    const importConfigId = ImportConfigId
    const listingKey = firstItem.ListingKey
    const imageFileName = path.basename(imageUrl)
    const listingPath = [baseFolder, importConfigId, listingKey, imageFileName]
    const FileUId = listingPath.join('/')

    return {
      ...firstItem,
      FileUId: FileUId,
      ImportConfigId: ImportConfigId,
      ImageFileName: imageFileName,
      SourceRecord: firstItem,
    }
  }

  async uploadImage(mediaItem: any) {
    try {
      const imageFile = await this.imageHelper.createImageFileFromImageUrl(
        mediaItem.MediaURL
      )
      const { Location } = await this.publicS3Client.write(
        mediaItem.FileUId,
        imageFile
      )
      // this.logger.info({
      //   message: 'SUCCESS_UPLOAD_S3_FILE',
      //   Location,
      // })
      return Location
    } catch (error) {
      this.logger.error({
        message: 'ERROR_uploadImage',
        error,
        mediaItem,
      })
    }
  }
}

export default SetListingMedia
