import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Accordion } from './index'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled'],
    },
    multiple: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

const sampleItems = [
  {
    id: 'item-1',
    trigger: 'What is your return policy?',
    content: [
      'We offer a 30-day return policy on all items.',
      'Items must be in original condition with tags attached.',
    ],
  },
  {
    id: 'item-2',
    trigger: 'How long does shipping take?',
    content: [
      'Standard shipping takes 5-7 business days.',
      'Express shipping is available for 2-3 day delivery.',
    ],
  },
  {
    id: 'item-3',
    trigger: 'Do you ship internationally?',
    content: ['Yes, we ship to over 100 countries worldwide.', 'International shipping times vary by location.'],
  },
]

export const Default: Story = {
  args: {
    variant: 'default',
    items: sampleItems,
  },
}

export const SingleOpen: Story = {
  args: {
    variant: 'default',
    multiple: false,
    items: sampleItems,
  },
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    items: sampleItems,
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    items: sampleItems,
  },
}

export const Multiple: Story = {
  args: {
    variant: 'bordered',
    multiple: true,
    items: sampleItems,
  },
}

export const DefaultOpen: Story = {
  args: {
    variant: 'bordered',
    defaultOpen: ['item-1', 'item-3'],
    multiple: true,
    items: sampleItems,
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      return { sampleItems }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Default</h3>
          <Accordion variant="default" :items="sampleItems" />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Bordered</h3>
          <Accordion variant="bordered" :items="sampleItems" />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Filled</h3>
          <Accordion variant="filled" :items="sampleItems" />
        </div>
      </div>
    `,
  }),
}
