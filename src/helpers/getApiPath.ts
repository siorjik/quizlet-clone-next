const apiHost = `${process.env.API_HOST}/api`
const appHost = `${process.env.NEXT_PUBLIC_APP_HOST}/api`

export default (url: string, isRemoteApi: boolean = false): string => {
  return isRemoteApi ? `${apiHost}/${url}` : `${appHost}/${url}`
}
