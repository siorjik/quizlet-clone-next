import apiService from '@/services/apiService'

describe('apiService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get data', async() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
      }),
    ) as jest.Mock

    const result = await apiService({ url: 'test' })

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ test: 100 })
  })

  it('should throw error', async() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject({ error: 'error' }),
      }),
    ) as jest.Mock

    await expect(apiService({ url: 'test' })).rejects.toEqual({ error: 'error' })
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
