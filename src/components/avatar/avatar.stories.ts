import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Avatar from './avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: 'text',
    },
    fallback: {
      control: 'text',
    },
    borderColor: {
      control: 'color',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    alt: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    fallback: 'JD',
    size: 'md',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
    size: 'md',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const WithBorderColor: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    fallback: 'AB',
    borderColor: '#3b82f6',
    size: 'md',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url.com/image.jpg',
    fallback: 'ER',
    size: 'md',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    fallback: 'SM',
    size: 'sm',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const Medium: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=4',
    fallback: 'MD',
    size: 'md',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    fallback: 'LG',
    size: 'lg',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex gap-4 items-center">
        <Avatar src="https://i.pravatar.cc/150?img=3" fallback="SM" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?img=4" fallback="MD" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=5" fallback="LG" size="lg" />
      </div>
    `,
  }),
}

export const WithDifferentBorders: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex gap-4 items-center">
        <Avatar src="https://i.pravatar.cc/150?img=7" fallback="BL" border-color="#3b82f6" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=8" fallback="GR" border-color="#10b981" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=9" fallback="RD" border-color="#ef4444" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=10" fallback="YL" border-color="#eab308" size="md" />
      </div>
    `,
  }),
}

export const FallbackVariations: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex gap-4 items-center">
        <Avatar fallback="AB" size="md" />
        <Avatar fallback="CD" size="md" />
        <Avatar fallback="EF" size="md" />
        <Avatar fallback="GH" size="md" />
      </div>
    `,
  }),
}

export const Group: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex -space-x-2">
        <Avatar src="https://i.pravatar.cc/150?img=11" fallback="U1" border-color="#ffffff" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=12" fallback="U2" border-color="#ffffff" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=13" fallback="U3" border-color="#ffffff" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=14" fallback="U4" border-color="#ffffff" size="md" />
        <Avatar fallback="+5" border-color="#ffffff" size="md" />
      </div>
    `,
  }),
}
