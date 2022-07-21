const AWS = require('aws-sdk')

/**
 * Handle the S3 read and write operations.
 */
export class S3Client {
  /**
   * Instantiate the S3Client class.
   */
  [property: string]: any
  constructor(bucket: string) {
    this.bucket = bucket
    const { STAGE: stage, REGION: region } = process.env
    const s3Params = { region, signatureVersion: 'v4' }
    this.client = new AWS.S3(s3Params)
  }

  /**
   * Read the file from S3.
   *
   * @param {string} key The key of the S3 file to be read.
   */
  async read(key: string) {
    const getParams = {
      Bucket: this.bucket,
      Key: key,
    }

    return this.client.getObject(getParams).promise()
  }

  /**
   * Write the file to S3.
   *
   * @param {string} Key The key where the S3 file will be written.
   * @param {any} Body The content of the S3 file to be written
   * @param {Object} [Metadata={}] The metadata to attach on the S3 file to be written
   */
  async write(Key: string, Body: any, Metadata = {}) {
    const writeParams = {
      Key,
      Body,
      // ContentEncoding: 'base64',
      ContentType: 'image/png',
      Bucket: this.bucket,
    }

    return this.client.upload(writeParams).promise()
  }
}
