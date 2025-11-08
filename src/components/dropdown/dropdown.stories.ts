import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Dropdown from './dropdown.vue'
import type { DropdownItem } from './dropdown.types'
import { ref } from 'vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered'],
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

const sampleItems: DropdownItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

export const Default: Story = {
  render: args => ({
    components: { Dropdown },
    setup() {
      const selectedValue = ref('')
      return { args, selectedValue }
    },
    template: `
      <div class="flex items-center justify-center h-64">
        <Dropdown
          v-bind="args"
          v-model="selectedValue"
        />
      </div>
      <div class="text-center mt-4">
        Selected value: <strong>{{ selectedValue || 'None' }}</strong>
      </div>
    `,
  }),
  args: {
    items: sampleItems,
    placeholder: 'Select a fruit',
    size: 'md',
    variant: 'default',
    placement: 'bottom',
    disabled: false,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items = sampleItems
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { items, small, medium, large }
    },
    template: `
      <div class="flex flex-col items-center justify-center gap-4 h-96">
        <Dropdown v-model="small" :items="items" size="sm" placeholder="Small" />
        <Dropdown v-model="medium" :items="items" size="md" placeholder="Medium" />
        <Dropdown v-model="large" :items="items" size="lg" placeholder="Large" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items = sampleItems
      const defaultVar = ref('')
      const bordered = ref('')
      return { items, defaultVar, bordered }
    },
    template: `
      <div class="flex items-center justify-center gap-4 h-64">
        <Dropdown v-model="defaultVar" :items="items" variant="default" placeholder="Default" />
        <Dropdown v-model="bordered" :items="items" variant="bordered" placeholder="Bordered" />
      </div>
    `,
  }),
}

export const WithDisabledItems: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items: DropdownItem[] = [
        { value: 'option1', label: 'Available Option 1' },
        { value: 'option2', label: 'Disabled Option', disabled: true },
        { value: 'option3', label: 'Available Option 2' },
        { value: 'option4', label: 'Another Disabled', disabled: true },
        { value: 'option5', label: 'Available Option 3' },
      ]
      const selected = ref('')
      return { items, selected }
    },
    template: `
      <div class="flex items-center justify-center h-64">
        <Dropdown
          v-model="selected"
          :items="items"
          placeholder="Select an option"
        />
      </div>
    `,
  }),
}

export const DisabledDropdown: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items = sampleItems
      const selected = ref('apple')
      return { items, selected }
    },
    template: `
      <div class="flex items-center justify-center h-64">
        <Dropdown
          v-model="selected"
          :items="items"
          placeholder="Select a fruit"
          disabled
        />
      </div>
    `,
  }),
}

export const WithPreselectedValue: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items = sampleItems
      const selected = ref('banana')
      return { items, selected }
    },
    template: `
      <div class="flex items-center justify-center h-64">
        <Dropdown
          v-model="selected"
          :items="items"
          placeholder="Select a fruit"
        />
      </div>
      <div class="text-center mt-4">
        Selected value: <strong>{{ selected }}</strong>
      </div>
    `,
  }),
}

export const LongList: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items: DropdownItem[] = Array.from({ length: 20 }, (_, i) => ({
        value: `option-${i + 1}`,
        label: `Option ${i + 1}`,
      }))
      const selected = ref('')
      return { items, selected }
    },
    template: `
      <div class="flex items-center justify-center h-96">
        <Dropdown
          v-model="selected"
          :items="items"
          placeholder="Select from many options"
        />
      </div>
    `,
  }),
}

export const TopPlacement: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const items = sampleItems
      const selected = ref('')
      return { items, selected }
    },
    template: `
      <div class="flex items-end justify-center h-96 pb-8">
        <Dropdown
          v-model="selected"
          :items="items"
          placement="top"
          placeholder="Opens upward"
        />
      </div>
    `,
  }),
}

export const MultipleDropdowns: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const fruits = sampleItems
      const colors: DropdownItem[] = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
      ]
      const countries: DropdownItem[] = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
      ]

      const selectedFruit = ref('')
      const selectedColor = ref('')
      const selectedCountry = ref('')

      return { fruits, colors, countries, selectedFruit, selectedColor, selectedCountry }
    },
    template: `
      <div class="flex flex-col items-center justify-center gap-4 h-96">
        <div class="flex gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Favorite Fruit</label>
            <Dropdown v-model="selectedFruit" :items="fruits" placeholder="Select fruit" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Favorite Color</label>
            <Dropdown v-model="selectedColor" :items="colors" placeholder="Select color" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Country</label>
            <Dropdown v-model="selectedCountry" :items="countries" placeholder="Select country" />
          </div>
        </div>
        <div class="text-center mt-4 text-sm">
          <div>Fruit: <strong>{{ selectedFruit || 'None' }}</strong></div>
          <div>Color: <strong>{{ selectedColor || 'None' }}</strong></div>
          <div>Country: <strong>{{ selectedCountry || 'None' }}</strong></div>
        </div>
      </div>
    `,
  }),
}
