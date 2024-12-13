import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Input from '../components/Input'

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { options: ['text', 'email', 'password'], control: 'radio' },
    label: { options: ['label', ''], control: 'radio' },
    placeholder: { control: 'text' },
    name: { control: 'text' },
    inputStyle: { control: 'text' },
    blockStyle: { control: 'text' },
    isRequired: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    errors: {},
    label: 'label',
    placeholder: 'Placeholder',
    name: 'name',
    register: {  name: 'name', onChange: fn(), onBlur: fn(), ref: fn() },
    inputStyle: 'input',
    blockStyle: 'w-full',
    isRequired: true,
  },
}

export const WithError: Story = {
  args: {
    ...Default.args,
    errors: { name: { message: 'error message', type: 'required' }},
  },
}
