import B2 from 'backblaze-b2'

const storageName = process.env.STORAGE_NAME!
const storageKeyId = process.env.STORAGE_ACCESS_KEY_ID!
const storageKey = process.env.STORAGE_ACCESS_KEY!
const storageId = process.env.STORAGE_ID!

export default class StorageService {
  private b2 = new B2({
    applicationKeyId: storageKeyId,
    applicationKey: storageKey,
  })
  private storageAuth: { authToken: string, downloadURL: string } = { authToken: '', downloadURL: '' }
  private deleteTime = 1000 * 60 * 60 * 8 // 8 hours

  async authorize() {
    try {
      if (!this.storageAuth.authToken){
        const { data } = await this.b2.authorize()

        this.storageAuth = { authToken: data.authorizationToken, downloadURL: data.downloadUrl }

        setTimeout(() => this.storageAuth = { authToken: '', downloadURL: '' }, this.deleteTime)
      }

      return this.storageAuth
    } catch (error) {
      throw error
    }
  }

  async uploadFile(fileStr: string, fileName: string) {
    try {
      const { data: authData } = await this.b2.authorize()

      const preparedFile = fileStr.replace(/^data:image\/\w+;base64,/, '')
      const buf = Buffer.from(preparedFile, 'base64')

      const { data: uploadData } = await this.b2.getUploadUrl({
        bucketId: storageId,
      })

      await this.b2.uploadFile({
        uploadUrl: uploadData.uploadUrl,
        uploadAuthToken: uploadData.authorizationToken,
        fileName: `images/${fileName}`,
        data: buf,
      })

      const downloadURL = authData.downloadUrl

      const url = `${downloadURL}/file/${storageName}/images/${fileName}`

      return url
    } catch (error) {
      console.log('56 - ', error)
      throw error
    }
  }

  async getAuthFileUrl(url: string) {
    try {
      return `${url}?Authorization=${this.storageAuth.authToken}`
    } catch (error) {
      throw error
    }
  }

  async deleteAuth() {
    this.storageAuth = { authToken: '', downloadURL: '' }
  }
}
