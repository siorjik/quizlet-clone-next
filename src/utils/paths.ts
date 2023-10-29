/***** app *****/

import getApiPath from '@/helpers/getApiPath'

export const homeAppPath = '/home'
export const profileAppPath = '/profile'

// library
export const libraryAppPath = '/library'
export const setsAppPath = `${libraryAppPath}/sets`
export const createSetAppPath = `${setsAppPath}/create`
export const videosAppPath = `${libraryAppPath}/videos`
export const getSetAppPath = (id: string) => `${setsAppPath}/${id}`
export const getEditSetAppPath = (id: string) => `${setsAppPath}/${id}/edit`

/***** api *****/

// library
export const libraryApiPath = `${getApiPath('library')}`

// set
export const getSetApiPath = (isRemoteApi: boolean = false) => `${getApiPath('set', isRemoteApi)}`

export const getApiDictionaryPath = (word: string) => `/api/dictionary?word=${word}`
export const getApiTranslatePath = (word: string) => `/api/translate?word=${word}`


