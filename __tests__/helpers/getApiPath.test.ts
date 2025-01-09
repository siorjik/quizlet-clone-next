import getApiPath from '@/helpers/getApiPath'

describe('getApiPath', () => {
  const originalEnv = { ...process.env, API_HOST: undefined, NEXT_PUBLIC_APP_HOST: undefined }

  afterEach(() => {
    process.env = originalEnv
  })

  it('should return api path for local api', () => {
    process.env = { ...process.env, NEXT_PUBLIC_APP_HOST: 'appHost' }
    
    expect(getApiPath('url')).toBe(`appHost/api/url`)
  })

  it('should return api path for remote api', () => {
    process.env = { ...process.env, API_HOST: 'apiHost' }
    
    expect(getApiPath('url', true)).toBe(`apiHost/api/url`)
  })
})
