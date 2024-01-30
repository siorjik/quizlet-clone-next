import getApiPath from '@/helpers/getApiPath'

/***** app *****/
export const loginAppPath = '/login'
export const profileAppPath = '/profile'

// library
export const libraryAppPath = '/library'

// sets
export const setsAppPath = `${libraryAppPath}/sets`
export const createSetAppPath = `${setsAppPath}/create`
export const getSetAppPath = (id: string) => `${setsAppPath}/${id}`
export const getEditSetAppPath = (id: string) => `${setsAppPath}/${id}/edit`
export const getSetFlashCardsAppPath = (id: string) => `${getSetAppPath(id)}/flash-cards`

export const videosAppPath = `${libraryAppPath}/videos`

/***** api *****/
export const getApiDictionaryPath = (word: string) => `/api/dictionary?word=${word}`
export const getApiTranslatePath = (word: string) => `/api/translate?word=${word}`

// auth
export const loginApiPath = getApiPath('auth/login', true)
export const getLogoutApiPath = (isRemoteApi: boolean = false) => getApiPath('auth/logout', isRemoteApi)
export const getRefreshApiPath = (refreshToken: string) => `auth/refresh?refresh=${refreshToken}`

// sets
export const getSetApiPath = (isRemoteApi: boolean = false) => getApiPath('sets', isRemoteApi)
