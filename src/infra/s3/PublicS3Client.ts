import { S3Client } from './S3Client'

class PublicS3Client extends S3Client {
  constructor() {
    super(process.env.PUBLIC_BUCKET || '')
  }
}

module.exports = PublicS3Client
