import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './badge.vue'
import { TickIcon, DangerIcon, ErrorIcon, InfoIcon } from '@/components/icons'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    outline: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Success</Badge>',
  }),
}

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Error</Badge>',
  }),
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Warning</Badge>',
  }),
}

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Info</Badge>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex gap-3 flex-wrap">
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    `,
  }),
}

export const Outline: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex gap-3 flex-wrap">
        <Badge variant="success" outline>Success</Badge>
        <Badge variant="error" outline>Error</Badge>
        <Badge variant="warning" outline>Warning</Badge>
        <Badge variant="info" outline>Info</Badge>
      </div>
    `,
  }),
}

export const WithIconLeft: Story = {
  render: () => ({
    components: { Badge, TickIcon, ErrorIcon, DangerIcon, InfoIcon },
    template: `
      <div class="flex gap-3 flex-wrap">
        <Badge variant="success">
          <template #iconLeft>
            <TickIcon :size="14" />
          </template>
          Success
        </Badge>
        <Badge variant="error">
          <template #iconLeft>
            <ErrorIcon :size="14" />
          </template>
          Error
        </Badge>
        <Badge variant="warning">
          <template #iconLeft>
            <DangerIcon :size="14" />
          </template>
          Warning
        </Badge>
        <Badge variant="info">
          <template #iconLeft>
            <InfoIcon :size="14" />
          </template>
          Info
        </Badge>
      </div>
    `,
  }),
}

export const WithIconRight: Story = {
  render: () => ({
    components: { Badge, TickIcon, ErrorIcon, DangerIcon, InfoIcon },
    template: `
      <div class="flex gap-3 flex-wrap">
        <Badge variant="success">
          Success
          <template #iconRight>
            <TickIcon :size="14" />
          </template>
        </Badge>
        <Badge variant="error">
          Error
          <template #iconRight>
            <ErrorIcon :size="14" />
          </template>
        </Badge>
        <Badge variant="warning">
          Warning
          <template #iconRight>
            <DangerIcon :size="14" />
          </template>
        </Badge>
        <Badge variant="info">
          Info
          <template #iconRight>
            <InfoIcon :size="14" />
          </template>
        </Badge>
      </div>
    `,
  }),
}

export const WithBothIcons: Story = {
  render: () => ({
    components: { Badge, TickIcon, ErrorIcon },
    template: `
      <div class="flex gap-3 flex-wrap">
        <Badge variant="success">
          <template #iconLeft>
            <TickIcon :size="14" />
          </template>
          Success
          <template #iconRight>
            <TickIcon :size="14" />
          </template>
        </Badge>
        <Badge variant="error">
          <template #iconLeft>
            <ErrorIcon :size="14" />
          </template>
          Error
          <template #iconRight>
            <ErrorIcon :size="14" />
          </template>
        </Badge>
      </div>
    `,
  }),
}

export const OutlineWithIcons: Story = {
  render: () => ({
    components: { Badge, TickIcon, ErrorIcon, DangerIcon, InfoIcon },
    template: `
      <div class="flex gap-3 flex-wrap">
        <Badge variant="success" outline>
          <template #iconLeft>
            <TickIcon :size="14" />
          </template>
          Success
        </Badge>
        <Badge variant="error" outline>
          <template #iconLeft>
            <ErrorIcon :size="14" />
          </template>
          Error
        </Badge>
        <Badge variant="warning" outline>
          <template #iconLeft>
            <DangerIcon :size="14" />
          </template>
          Warning
        </Badge>
        <Badge variant="info" outline>
          <template #iconLeft>
            <InfoIcon :size="14" />
          </template>
          Info
        </Badge>
      </div>
    `,
  }),
}

export const AllStyles: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-col gap-4">
        <div>
          <h3 class="text-sm font-semibold mb-2">Solid</h3>
          <div class="flex gap-3 flex-wrap">
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-2">Outline</h3>
          <div class="flex gap-3 flex-wrap">
            <Badge variant="success" outline>Success</Badge>
            <Badge variant="error" outline>Error</Badge>
            <Badge variant="warning" outline>Warning</Badge>
            <Badge variant="info" outline>Info</Badge>
          </div>
        </div>
      </div>
    `,
  }),
}
