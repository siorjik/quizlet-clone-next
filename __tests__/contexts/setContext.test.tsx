import React, { useEffect } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import useSetContext, { SetContextProvider } from '@/contexts/SetContext'
import apiService from '@/services/apiService'

describe('SetContext', () => {
  // const setSet = jest.fn()
  // jest.spyOn(React, 'useState').mockImplementation(() => [{ data: {}, list: [] }, setSet])

  it('should return initial values', () => {
    const ChildrenComp = () => {
      const { data, list } = useSetContext()

      return (
        <>
          <div>data: {'title' in data ? data.title : '{}'}</div>
          <div>list: {list.length ? list.length : '[]'}</div>
        </>
      )
    }

    render(<SetContextProvider>{<ChildrenComp />}</SetContextProvider>)

    expect(screen.getByText('data: {}')).toBeInTheDocument()
    expect(screen.getByText('list: []')).toBeInTheDocument()
  })

  it('should set context by click', () => {
    const ChildrenComp = () => {
      const { data, list, setContext } = useSetContext()

      return (
        <>
          <button onClick={() => setContext({ data: { title: 'test' } })}>set data</button>
          <button onClick={() => setContext({ list: [{ title: 'test' }] })}>set list</button>

          <div>data: {'title' in data ? data.title : '{}'}</div>
          <div>list: {list.length ? list.length : '[]'}</div>
        </>
      )
    }

    render(<SetContextProvider>{<ChildrenComp />}</SetContextProvider>) 

    expect(screen.getByText('data: {}')).toBeInTheDocument()
    expect(screen.getByText('list: []')).toBeInTheDocument()

    expect(screen.getByText('set data')).toBeInTheDocument()
    expect(screen.getByText('set list')).toBeInTheDocument()

    fireEvent.click(screen.getByText('set data'))
    fireEvent.click(screen.getByText('set list'))

    expect(screen.getByText('data: test')).toBeInTheDocument()
    expect(screen.getByText('list: 1')).toBeInTheDocument()
  })

  it('should get context values from api', async () => {
    type RespType = { data: { title: string }, list: { title: string }[] }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { title: 'test' }, list: [{ title: 'test' }] }),
      }),
    ) as jest.Mock

    
    const ChildrenComp = () => {
      const { data, list, setContext } = useSetContext()
      
      useEffect(() => {
        (async() => {
          const res = await apiService({ url: 'test' }) as RespType

          setContext({ data: res?.data, list: res?.list })
        })()
      }, [])

      return (
        <>
          <div>data: {data.title ? data.title : '{}'}</div>
          <div>list: {list.length ? list.length : '[]'}</div>
        </>
      )
    }

    render(<SetContextProvider>{<ChildrenComp />}</SetContextProvider>)

    expect(screen.getByText('data: {}')).toBeInTheDocument()
    expect(screen.getByText('list: []')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('data: test')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('list: 1')).toBeInTheDocument()
    })
  })
})
