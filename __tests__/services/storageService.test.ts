import StorageService from '@/services/storageService'

describe('StorageService', () => {
  it('should authorize', async () => {
    const storageService = new StorageService()
    const authResponse = { authToken: 'token', downloadURL: 'url' }

    jest.spyOn(storageService, 'authorize').mockResolvedValue(authResponse)

    await storageService.authorize()

    expect(storageService.authorize).toHaveBeenCalledTimes(1)
    expect(storageService.authorize()).resolves.toBe(authResponse)
  })

  it('should upload file', async () => {
    const storageService = new StorageService()
    const fileStr = 'fileStr'
    const fileName = 'fileName'
    const url = 'url'

    jest.spyOn(storageService, 'uploadFile').mockResolvedValue(url)

    await storageService.uploadFile(fileStr, fileName)

    expect(storageService.uploadFile).toHaveBeenCalledTimes(1)
    expect(storageService.uploadFile(fileStr, fileName)).resolves.toBe(url)
  })

  it('should get auth file url', async () => {
    const storageService = new StorageService()
    const url = 'url'

    jest.spyOn(storageService, 'getAuthFileUrl').mockReturnValue(url)

    storageService.getAuthFileUrl(url)
    storageService.deleteAuth()

    expect(storageService.getAuthFileUrl).toHaveBeenCalledTimes(1)
    expect(storageService.getAuthFileUrl(url)).toBe(url)
  })

  it('should delete auth', async () => {
    const storageService = new StorageService()

    jest.spyOn(storageService, 'deleteAuth')

    storageService.deleteAuth()

    expect(storageService.deleteAuth).toHaveBeenCalledTimes(1)
  })
})
