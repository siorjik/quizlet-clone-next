import { subscribe, unsubscribe, broadcast, actions } from '@/services/eventBusService'

describe('eventBusService', () => {
  beforeEach(() => {
    for (const key in actions) {
      delete actions[key]
    }

    jest.resetAllMocks()
  })

  it('should subscribe', () => {
    const eventName = 'test'
    const cb = () => {}

    subscribe(eventName, cb)

    expect(actions[eventName]).toBeDefined()
    expect(actions[eventName].has(cb)).toBe(true)
  })

  it('should unsubscribe', () => {
    const eventName = 'test'
    const cb = () => {}

    subscribe(eventName, cb)
    unsubscribe(eventName, cb)

    expect(actions[eventName]).toBeUndefined()
  })

  it('should broadcast', () => {
    const eventName = 'test'
    const cb = jest.fn()
    const data = 'test'

    subscribe(eventName, cb)
    broadcast(eventName, data)

    expect(actions[eventName]).toBeDefined()
    expect(actions[eventName].size).toBe(1)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(data)
  })
})
