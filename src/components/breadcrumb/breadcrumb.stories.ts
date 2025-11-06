import type { Meta, StoryObj } from '@storybook/vue3'
import Breadcrumb from './breadcrumb.vue'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
    onClick: {
      action: 'click',
      description: 'Emitted when a breadcrumb item is clicked',
    },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { id: 'home', text: 'Home', visible: true },
      { id: 'products', text: 'Products', visible: true },
      { id: 'electronics', text: 'Electronics', visible: true },
      { id: 'laptops', text: 'Laptops', visible: true },
    ],
  },
}

export const WithEllipsis: Story = {
  args: {
    items: [
      { id: 'home', text: 'Home', visible: true },
      { id: 'level1', text: 'Level 1', visible: false },
      { id: 'level2', text: 'Level 2', visible: false },
      { id: 'level3', text: 'Level 3', visible: true },
      { id: 'current', text: 'Current Page', visible: true },
    ],
  },
}

export const Simple: Story = {
  args: {
    items: [
      { id: 'home', text: 'Home', visible: true },
      { id: 'about', text: 'About', visible: true },
    ],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { id: 'home', text: 'Home', visible: true },
      { id: 'documentation', text: 'Documentation', visible: true },
      { id: 'components', text: 'Components', visible: false },
      { id: 'forms', text: 'Forms', visible: false },
      { id: 'inputs', text: 'Inputs', visible: true },
      { id: 'text-input', text: 'Text Input', visible: true },
    ],
  },
}
