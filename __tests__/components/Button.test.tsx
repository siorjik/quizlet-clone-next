import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from '@/components/Button'
 
describe('Button', () => {
  it('should render a button', () => {
    render(<Button>Click me</Button>)
 
    const button = screen.getByRole('button')
    const text = screen.getByText('Click me')
 
    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('should click a button', async () => {
    const click = jest.fn()

    render(<Button click={click}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(click).toHaveBeenCalled()
  })
})
