import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Popover from './popover.vue'
import { ref } from 'vue'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
    },
    offset: {
      control: 'number',
    },
    closeOnClickOutside: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center justify-center h-64">
        <Popover v-bind="args">
          <template #trigger>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Click me
            </button>
          </template>
          <template #content>
            <div class="p-4 min-w-[200px]">
              <h3 class="font-semibold mb-2">Popover Title</h3>
              <p class="text-sm text-gray-600">This is the popover content.</p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    trigger: 'click',
    offset: 8,
    closeOnClickOutside: true,
    closeOnEscape: true,
  },
}

export const Placements: Story = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex flex-col items-center justify-center gap-32 p-32">
        <div class="flex gap-8">
          <Popover placement="top">
            <template #trigger>
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Top
              </button>
            </template>
            <template #content>
              <div class="p-4 min-w-[150px]">
                <p class="text-sm">Popover on top</p>
              </div>
            </template>
          </Popover>

          <Popover placement="bottom">
            <template #trigger>
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Bottom
              </button>
            </template>
            <template #content>
              <div class="p-4 min-w-[150px]">
                <p class="text-sm">Popover on bottom</p>
              </div>
            </template>
          </Popover>

          <Popover placement="left">
            <template #trigger>
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Left
              </button>
            </template>
            <template #content>
              <div class="p-4 min-w-[150px]">
                <p class="text-sm">Popover on left</p>
              </div>
            </template>
          </Popover>

          <Popover placement="right">
            <template #trigger>
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Right
              </button>
            </template>
            <template #content>
              <div class="p-4 min-w-[150px]">
                <p class="text-sm">Popover on right</p>
              </div>
            </template>
          </Popover>
        </div>
      </div>
    `,
  }),
}

export const HoverTrigger: Story = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center h-64">
        <Popover trigger="hover">
          <template #trigger>
            <button class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
              Hover me
            </button>
          </template>
          <template #content>
            <div class="p-4 min-w-[200px]">
              <p class="text-sm">This appears on hover!</p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
}

export const ControlledState: Story = {
  render: () => ({
    components: { Popover },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div class="flex flex-col items-center justify-center gap-4 h-64">
        <div class="flex gap-2">
          <button
            @click="isOpen = true"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Open Popover
          </button>
          <button
            @click="isOpen = false"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close Popover
          </button>
        </div>

        <Popover v-model:open="isOpen" trigger="manual">
          <template #trigger>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-md">
              Target Element
            </button>
          </template>
          <template #content>
            <div class="p-4 min-w-[200px]">
              <h3 class="font-semibold mb-2">Controlled Popover</h3>
              <p class="text-sm text-gray-600">
                This popover's state is controlled externally.
              </p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
}

export const RichContent: Story = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center h-64">
        <Popover>
          <template #trigger>
            <button class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              User Profile
            </button>
          </template>
          <template #content>
            <div class="p-4 w-72">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <h3 class="font-semibold">John Doe</h3>
                  <p class="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              <div class="border-t pt-3">
                <button class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 rounded">
                  View Profile
                </button>
                <button class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 rounded">
                  Settings
                </button>
                <button class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 rounded text-red-600">
                  Sign Out
                </button>
              </div>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
}
