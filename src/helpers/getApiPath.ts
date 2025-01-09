export default (url: string, isRemoteApi: boolean = false): string => {
  const apiHost = process.env.API_HOST
  const appHost = process.env.NEXT_PUBLIC_APP_HOST
  
  return isRemoteApi ? `${apiHost}/api/${url}` : appHost ? `${appHost}/api/${url}` : `/api/${url}`
}
