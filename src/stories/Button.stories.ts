import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from '../components/Button'

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { options: ['sm', 'md', 'lg'], control: 'radio' },
    bg: { options: ['slate', 'violet', 'lime', 'sky'], control: 'radio' },
    type: { options: ['button', 'submit'], control: 'radio' },
    children: { control: 'text' },
    css: { control: 'text' },
    isDisabled: { control: 'boolean' },
  },
  args: { click: fn() },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    type: 'submit',
    size: 'sm',
    bg: 'slate',
    children: 'Button sm',
    css: 'w-fit',
    isDisabled: false,
    click: fn(),
  }
}

export const Medium: Story = {
  args: {
    type: 'button',
    size: 'md',
    bg: 'violet',
    children: 'Button md',
    css: 'w-fit',
    isDisabled: false,
    click: fn(),
  },
}

export const Large: Story = {
  args: {
    type: 'button',
    size: 'lg',
    bg: 'sky',
    children: 'Button lg',
    css: 'w-fit',
    isDisabled: false,
    click: fn(),
  },
}
