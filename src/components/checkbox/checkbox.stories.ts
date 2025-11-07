import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Checkbox from './checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Checkbox label',
    checked: false,
  },
  render: args => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.checked)
      const handleChange = (value: boolean) => {
        checked.value = value
        args.onChange?.(value)
      }
      return { args, checked, handleChange }
    },
    template: '<Checkbox v-bind="args" :checked="checked" @change="handleChange" />',
  }),
}

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
  render: args => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.checked)
      const handleChange = (value: boolean) => {
        checked.value = value
      }
      return { args, checked, handleChange }
    },
    template: '<Checkbox v-bind="args" :checked="checked" @change="handleChange" />',
  }),
}

export const Unchecked: Story = {
  args: {
    label: 'Unchecked checkbox',
    checked: false,
  },
  render: args => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.checked)
      const handleChange = (value: boolean) => {
        checked.value = value
      }
      return { args, checked, handleChange }
    },
    template: '<Checkbox v-bind="args" :checked="checked" @change="handleChange" />',
  }),
}

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
  render: args => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.checked)
      const handleChange = (value: boolean) => {
        checked.value = value
      }
      return { args, checked, handleChange }
    },
    template: '<Checkbox v-bind="args" :checked="checked" @change="handleChange" />',
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const option1 = ref(false)
      const option2 = ref(true)
      const option3 = ref(false)
      const option4 = ref(true)

      return { option1, option2, option3, option4 }
    },
    template: `
      <div class="flex flex-col gap-4">
        <Checkbox label="Option 1" :checked="option1" @change="option1 = $event" />
        <Checkbox label="Option 2" :checked="option2" @change="option2 = $event" />
        <Checkbox label="Option 3" :checked="option3" @change="option3 = $event" />
        <Checkbox label="Option 4" :checked="option4" @change="option4 = $event" />
      </div>
    `,
  }),
}

export const Form: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const acceptTerms = ref(false)
      const subscribe = ref(true)
      const notifications = ref(false)

      const handleSubmit = () => {
        alert(`Terms: ${acceptTerms.value}, Subscribe: ${subscribe.value}, Notifications: ${notifications.value}`)
      }

      return { acceptTerms, subscribe, notifications, handleSubmit }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-md">
        <h3 class="text-lg font-semibold">Sign Up Form</h3>
        <Checkbox
          label="I accept the terms and conditions"
          :checked="acceptTerms"
          @change="acceptTerms = $event"
          id="terms"
        />
        <Checkbox
          label="Subscribe to newsletter"
          :checked="subscribe"
          @change="subscribe = $event"
          id="newsletter"
        />
        <Checkbox
          label="Enable notifications"
          :checked="notifications"
          @change="notifications = $event"
          id="notifications"
        />
        <button
          @click="handleSubmit"
          class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    `,
  }),
}

export const AllStates: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      const unchecked = ref(false)

      return { checked, unchecked }
    },
    template: `
      <div class="flex gap-6 flex-wrap">
        <Checkbox label="Checked" :checked="checked" @change="checked = $event" />
        <Checkbox label="Unchecked" :checked="unchecked" @change="unchecked = $event" />
        <Checkbox :checked="checked" @change="checked = $event" />
        <Checkbox :checked="unchecked" @change="unchecked = $event" />
      </div>
    `,
  }),
}
