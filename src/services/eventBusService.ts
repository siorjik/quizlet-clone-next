export type DataType = string | boolean | number

const actions: { [k: string]: Set<(data: DataType) => void> } = {}

export const subscribe = (eventName: string, cb: (data: DataType) => void): void => {
  if (!(eventName in actions)) actions[eventName] = new Set<(data: DataType) => void>()

  actions[eventName].add(cb)
}

export const unsubscribe = (eventName: string, cb: (data: DataType) => void): void => {
  actions[eventName].delete(cb)

  if (actions[eventName].size === 0) delete actions[eventName]
}

export const broadcast = (eventName: string, data: DataType): void => {
  if (actions[eventName]) {
    for(const cb of Array.from(actions[eventName])) {
      cb(data)
    }
  } else return
}
