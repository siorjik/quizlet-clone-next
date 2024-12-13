import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Modal from '../components/Modal'

const meta = {
  title: 'Example/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isShow: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {  close: fn() },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isShow: true,
    title: 'Modal title',
    content: <p>Modal content</p>,
  }
}

export const NotVisible: Story = {
  args: {
    isShow: false,
    title: 'Modal title',
    content: <p>Modal not visible content</p>,
  }
}
