/***** app *****/

export const homeAppPath = '/home'
export const profileAppPath = '/profile'

// library
export const libraryAppPath = '/library'
export const setsAppPath = `${libraryAppPath}/sets`
export const createSetAppPath = `${setsAppPath}/create`
export const videosAppPath = `${libraryAppPath}/videos`
export const getSetPath = (id: string) => `${setsAppPath}/${id}`
export const getEditSetPath = (id: string) => `${setsAppPath}/${id}/edit`

/***** api *****/

// library
export const libraryApiPath = '/api/library'
export const setApiPath = `${libraryApiPath}/set`
export const getApiDictionaryPath = (word: string) => `/api/dictionary?word=${word}`
export const getApiTranslatePath = (word: string) => `/api/translate?word=${word}`

