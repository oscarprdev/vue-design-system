import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from './index'
import { PlusIcon } from '@/components/icons'

const meta: Meta<typeof AccordionRoot> = {
  title: 'Components/Accordion',
  component: AccordionRoot,
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
type Story = StoryObj<typeof AccordionRoot>

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to over 100 countries worldwide. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}

export const SingleOpen: Story = {
  args: {
    variant: 'default',
    multiple: false,
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to over 100 countries worldwide. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to over 100 countries worldwide. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to over 100 countries worldwide. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}

export const Multiple: Story = {
  args: {
    variant: 'bordered',
    multiple: true,
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to over 100 countries worldwide. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}

export const DefaultOpen: Story = {
  args: {
    variant: 'bordered',
    defaultValue: ['item-1', 'item-3'],
    multiple: true,
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to over 100 countries worldwide. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Default</h3>
          <AccordionRoot variant="default">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Bordered</h3>
          <AccordionRoot variant="bordered">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Filled</h3>
          <AccordionRoot variant="filled">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
      </div>
    `,
  }),
}

export const CustomIcon: Story = {
  args: {
    variant: 'bordered',
  },
  render: args => ({
    components: { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent, PlusIcon },
    setup() {
      return { args }
    },
    template: `
      <AccordionRoot v-bind="args">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What is your return policy?
            <template #icon="{ isOpen }">
              <PlusIcon
                :class="['transition-transform duration-300 text-gray-500', { 'rotate-45': isOpen }]"
                :size="20"
              />
            </template>
          </AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy on all items. Items must be in original condition with tags attached.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How long does shipping take?
            <template #icon="{ isOpen }">
              <PlusIcon
                :class="['transition-transform duration-300 text-gray-500', { 'rotate-45': isOpen }]"
                :size="20"
              />
            </template>
          </AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    `,
  }),
}
