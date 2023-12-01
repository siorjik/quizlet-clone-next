type SetType = { [eventName: string]: (data: string | boolean | number) => void }
type DataType = string | boolean | number

const actions: Set<SetType> = new Set<SetType>()

export const subscribe = (eventName: string, cb: (data: DataType) => void) => {
  actions.add({ [eventName]: cb })
}

export const unsubscribe = (eventName: string, cb: (data: DataType) => void) => {
  actions.delete({ [eventName]: cb })
}

export const broadcast = (eventName: string, data: DataType) => {
  for(const obj of Array.from(actions)) {
    obj[eventName](data)
  }
}
