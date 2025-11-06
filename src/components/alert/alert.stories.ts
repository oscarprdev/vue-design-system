import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Alert from './alert.vue'
import { BellIcon } from '@/components/icons'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Informational',
    description: 'This is a default alert with some information.',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args" />',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved successfully.',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args" />',
  }),
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your changes before proceeding.',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args" />',
  }),
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'There was an error processing your request.',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args" />',
  }),
}

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Success',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args" />',
  }),
}

export const DescriptionOnly: Story = {
  args: {
    variant: 'warning',
    description: 'This alert only has a description without a title.',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args" />',
  }),
}

export const CustomContent: Story = {
  args: {
    variant: 'error',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <div class="font-semibold text-sm mb-1">Custom Content</div>
        <div class="text-sm opacity-90">
          You can use the default slot to provide completely custom content.
          <a href="#" class="underline font-medium">Learn more</a>
        </div>
      </Alert>
    `,
  }),
}

export const CustomIcon: Story = {
  args: {
    variant: 'success',
    title: 'Custom Icon',
    description: 'This alert uses a custom icon via the icon slot.',
  },
  render: args => ({
    components: { Alert, BellIcon },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <template #icon>
          <BellIcon :size="20" />
        </template>
      </Alert>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4">
        <Alert variant="default" title="Informational" description="This is a default alert with some information." />
        <Alert variant="success" title="Success" description="Your changes have been saved successfully." />
        <Alert variant="warning" title="Warning" description="Please review your changes before proceeding." />
        <Alert variant="error" title="Error" description="There was an error processing your request." />
      </div>
    `,
  }),
}
