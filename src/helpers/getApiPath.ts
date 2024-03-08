const apiHost = process.env.API_HOST

export default (url: string, isRemoteApi: boolean = false): string => {
  return isRemoteApi ? `${apiHost}/api/${url}` : `/api/${url}`
}
