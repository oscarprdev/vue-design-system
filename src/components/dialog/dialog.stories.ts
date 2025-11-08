import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Dialog from './dialog.vue'
import DialogHeader from './dialog-header.vue'
import DialogBody from './dialog-body.vue'
import DialogFooter from './dialog-footer.vue'
import DialogProvider from './dialog-provider.vue'
import { useDialog } from '../../composables/useDialog'
import { ref, defineComponent } from 'vue'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
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
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: args => ({
    components: { Dialog, DialogHeader, DialogBody, DialogFooter },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Open Dialog
        </button>

        <Dialog v-model:open="isOpen" v-bind="args">
          <template #default="{ close }">
            <DialogHeader @close="close">
              Dialog Title
            </DialogHeader>
            <DialogBody>
              <p>This is the dialog content. You can put any content here.</p>
            </DialogBody>
            <DialogFooter>
              <button
                @click="close"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                @click="close"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </DialogFooter>
          </template>
        </Dialog>
      </div>
    `,
  }),
  args: {
    size: 'md',
    closeOnClickOutside: true,
    closeOnEscape: true,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Dialog, DialogHeader, DialogBody, DialogFooter },
    setup() {
      const isOpen = ref(false)
      const currentSize = ref<'sm' | 'md' | 'lg' | 'xl'>('md')

      const openDialogWithSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
        currentSize.value = size
        isOpen.value = true
      }

      return { isOpen, currentSize, openDialogWithSize }
    },
    template: `
      <div class="flex gap-3">
        <button
          @click="openDialogWithSize('sm')"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Small
        </button>
        <button
          @click="openDialogWithSize('md')"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Medium
        </button>
        <button
          @click="openDialogWithSize('lg')"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Large
        </button>
        <button
          @click="openDialogWithSize('xl')"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Extra Large
        </button>

        <Dialog v-model:open="isOpen" :size="currentSize">
          <template #default="{ close }">
            <DialogHeader @close="close">
              {{ currentSize.toUpperCase() }} Dialog
            </DialogHeader>
            <DialogBody>
              <p>This is a {{ currentSize }} sized dialog.</p>
            </DialogBody>
            <DialogFooter>
              <button
                @click="close"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </DialogFooter>
          </template>
        </Dialog>
      </div>
    `,
  }),
}

export const WithoutCloseButton: Story = {
  render: () => ({
    components: { Dialog, DialogHeader, DialogBody, DialogFooter },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Open Dialog
        </button>

        <Dialog v-model:open="isOpen">
          <template #default="{ close }">
            <DialogHeader :show-close="false">
              Dialog Without Close Button
            </DialogHeader>
            <DialogBody>
              <p>This dialog doesn't have a close button in the header.</p>
              <p class="mt-2 text-sm text-gray-600">You must use the buttons below to close it.</p>
            </DialogBody>
            <DialogFooter>
              <button
                @click="close"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                OK
              </button>
            </DialogFooter>
          </template>
        </Dialog>
      </div>
    `,
  }),
}

export const NonDismissible: Story = {
  render: () => ({
    components: { Dialog, DialogHeader, DialogBody, DialogFooter },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Open Non-Dismissible Dialog
        </button>

        <Dialog
          v-model:open="isOpen"
          :close-on-click-outside="false"
          :close-on-escape="false"
        >
          <template #default="{ close }">
            <DialogHeader :show-close="false">
              Important Notice
            </DialogHeader>
            <DialogBody>
              <p>This dialog cannot be dismissed by clicking outside or pressing ESC.</p>
              <p class="mt-2 text-sm text-gray-600">You must click the button below.</p>
            </DialogBody>
            <DialogFooter>
              <button
                @click="close"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                I Understand
              </button>
            </DialogFooter>
          </template>
        </Dialog>
      </div>
    `,
  }),
}

export const LongContent: Story = {
  render: () => ({
    components: { Dialog, DialogHeader, DialogBody, DialogFooter },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Open Dialog with Long Content
        </button>

        <Dialog v-model:open="isOpen" size="lg">
          <template #default="{ close }">
            <DialogHeader @close="close">
              Terms and Conditions
            </DialogHeader>
            <DialogBody>
              <div class="space-y-4 max-h-96 overflow-y-auto">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </DialogBody>
            <DialogFooter>
              <button
                @click="close"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Decline
              </button>
              <button
                @click="close"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Accept
              </button>
            </DialogFooter>
          </template>
        </Dialog>
      </div>
    `,
  }),
}

// Programmatic API Example
const ConfirmationDialog = defineComponent({
  props: {
    title: String,
    message: String,
    onClose: Function,
  },
  components: { DialogHeader, DialogBody, DialogFooter },
  emits: ['close'],
  setup(_props, { emit }) {
    const handleClose = () => {
      emit('close')
    }

    return { handleClose }
  },
  template: `
    <div>
      <DialogHeader @close="handleClose">
        {{ title }}
      </DialogHeader>
      <DialogBody>
        <p>{{ message }}</p>
      </DialogBody>
      <DialogFooter>
        <button
          @click="handleClose"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="handleClose"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </DialogFooter>
    </div>
  `,
})

export const ProgrammaticAPI: Story = {
  render: () => ({
    components: { DialogProvider },
    setup() {
      const { open } = useDialog()

      const openConfirmDialog = () => {
        open(ConfirmationDialog, {
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item? This action cannot be undone.',
          size: 'md',
          onClose: async () => {
            console.log('Dialog closed')
          },
        })
      }

      const openInfoDialog = () => {
        open(ConfirmationDialog, {
          title: 'Information',
          message: 'This is an informational dialog opened programmatically.',
          size: 'sm',
        })
      }

      return { openConfirmDialog, openInfoDialog }
    },
    template: `
      <div>
        <div class="flex gap-3">
          <button
            @click="openConfirmDialog"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Open Confirmation Dialog
          </button>
          <button
            @click="openInfoDialog"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Open Info Dialog
          </button>
        </div>
        <DialogProvider />
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: () => ({
    components: { Dialog, DialogHeader, DialogBody, DialogFooter },
    setup() {
      const isOpen = ref(false)
      const email = ref('')
      const subscribe = () => {
        console.log('Subscribed:', email.value)
        isOpen.value = false
      }
      return { isOpen, email, subscribe }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Subscribe to Newsletter
        </button>

        <Dialog v-model:open="isOpen" size="md">
          <template #default="{ close }">
            <DialogHeader @close="close">
              Subscribe to Our Newsletter
            </DialogHeader>
            <DialogBody>
              <div class="space-y-4">
                <p class="text-gray-600">Stay updated with our latest news and updates.</p>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <button
                @click="close"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                @click="subscribe"
                class="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Subscribe
              </button>
            </DialogFooter>
          </template>
        </Dialog>
      </div>
    `,
  }),
}
