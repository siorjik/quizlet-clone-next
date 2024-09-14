import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from '@/components/Button'
 
describe('Button', () => {
  it('should render a button', () => {
    const { getByRole, getByText } = render(<Button>Click me</Button>)
 
    const button = getByRole('button')
    const text = getByText('Click me')
 
    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('should click a button', async () => {
    const click = jest.fn()

    const { getByRole } = render(<Button click={click}>Click me</Button>)

    await userEvent.click(getByRole('button'))

    expect(click).toHaveBeenCalled()
  })
})
