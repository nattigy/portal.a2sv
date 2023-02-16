import { Storage } from '@google-cloud/storage'
import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import StorageConfig from 'storage-config'

@Injectable()
export class StorageService {
  private storage: Storage
  private bucket: string
  private storageURL: string
  private bucketFolder: string

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    })
    this.bucketFolder = 'profile-photos'
    this.storageURL = StorageConfig.storage_url
    this.bucket = StorageConfig.mediaBucket
  }

  async get(path: string): Promise<string> {
    return `${this.storageURL}/${this.bucket}/${path}`
  }

  async save(photoUrl: string, userId: string): Promise<string> {
    const base64EncodedString = photoUrl.replace(/^data:\w+\/\w+;base64,/, '')
    const fileBuffer = Buffer.from(base64EncodedString, 'base64')
    const path = `${this.bucketFolder}/${userId}-${Date.now()}`
    // const object = metadata?.reduce((obj, item) => Object.assign(obj, item), {})
    const file = this.storage.bucket(this.bucket).file(path)
    const stream = file.createWriteStream()

    try {
      stream.on('finish', async () => {
        return await file.setMetadata({
          // metadata: object,
        })
      })
      stream.end(fileBuffer)
    } catch (e) {
      throw new BadRequestException('Error uploading photo to GCS!')
    }

    return `${this.storageURL}/${this.bucket}/${file.name}`
  }

  async delete(path: string) {
    try {
      await this.storage.bucket(this.bucket).file(path.slice(50,)).delete({ ignoreNotFound: true })
    } catch (e) {
      return new BadRequestException('Error removing old photo from GCS!')
    }
  }
}
