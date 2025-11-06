import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from './button.vue'
import { LoaderIcon } from '@/components/icons'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Small Button</Button>',
  }),
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Large Button</Button>',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { Button, LoaderIcon },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Button variant="primary">
          <span class="flex items-center gap-2">
            <LoaderIcon :size="16" />
            <span>Loading...</span>
          </span>
        </Button>
        <Button variant="secondary">
          <span class="flex items-center gap-2">
            <LoaderIcon :size="16" />
            <span>Loading...</span>
          </span>
        </Button>
        <Button variant="outline">
          <span class="flex items-center gap-2">
            <LoaderIcon :size="16" />
            <span>Loading...</span>
          </span>
        </Button>
        <Button variant="primary" disabled>
          <span class="flex items-center gap-2">
            <LoaderIcon :size="16" />
            <span>Loading...</span>
          </span>
        </Button>
      </div>
    `,
  }),
}
