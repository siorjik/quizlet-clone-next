const apiHost = process.env.API_HOST
const appHost = process.env.NEXT_PUBLIC_APP_HOST
console.log(appHost)
export default (url: string, isRemoteApi: boolean = false): string => {
  return isRemoteApi ? `${apiHost}/api/${url}` : `${appHost}/api/${url}`
}
