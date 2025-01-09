import { render } from '@testing-library/react'

import Modal from '@/components/Modal'

describe('Modal', () => {
  it('should have Close button and content', () => {
    const { getByRole, getByText } = render(<Modal isShow title='Modal title' content={<p>Modal content</p>} close={() => { }} />)

    expect(getByRole('button')).toHaveTextContent('Close')
    expect(getByText('Modal content')).toBeInTheDocument()
  })

  it('should click Close button', async () => {
    const close = jest.fn()

    const { getByRole } = render(<Modal isShow title='Modal title' content={<p>Modal content</p>} close={close} />)

    getByRole('button').click()

    expect(close).toHaveBeenCalled()
  })

  it('should be not visible with isShow = false', async () => {
    const { queryByText } = render(<Modal isShow={false} title='Modal title' content={<p>Modal content</p>} close={close} />)

    expect(queryByText('Modal content')).not.toBeInTheDocument()
  })
})
