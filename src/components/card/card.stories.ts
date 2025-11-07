import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './card.vue'
import { Button } from '@/components/button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="w-[500px]">
        <template #header>
          <h3 class="text-lg font-semibold">Card Title</h3>
        </template>
        <template #content>
          <p class="text-sm text-gray-600">
            This is the card content area. You can put any content here.
          </p>
        </template>
        <template #footer>
          <p class="text-xs text-gray-500">Card footer</p>
        </template>
      </Card>
    `,
  }),
}

export const HeaderOnly: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="w-[500px]">
        <template #header>
          <h3 class="text-lg font-semibold">Card with Header Only</h3>
        </template>
      </Card>
    `,
  }),
}

export const ContentOnly: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="w-[500px]">
        <template #content>
          <p class="text-sm text-gray-600">
            This card only has content, no header or footer.
          </p>
        </template>
      </Card>
    `,
  }),
}

export const HeaderAndContent: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="w-[500px]">
        <template #header>
          <h3 class="text-lg font-semibold">Product Details</h3>
        </template>
        <template #content>
          <p class="text-sm text-gray-600 mb-2">Premium wireless headphones</p>
          <p class="text-2xl font-bold">$299.99</p>
        </template>
      </Card>
    `,
  }),
}

export const WithButtons: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card class="w-[500px]">
        <template #header>
          <h3 class="text-lg font-semibold">Confirm Action</h3>
        </template>
        <template #content>
          <p class="text-sm text-gray-600">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </template>
        <template #footer>
          <div class="flex gap-2 justify-end">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Delete</Button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const UserProfile: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card class="w-[500px]">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <h3 class="text-lg font-semibold">John Doe</h3>
              <p class="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
        </template>
        <template #content>
          <div class="space-y-2">
            <div class="flex justify-between py-2">
              <span class="text-sm text-gray-600">Role</span>
              <span class="text-sm font-medium">Administrator</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-sm text-gray-600">Location</span>
              <span class="text-sm font-medium">San Francisco, CA</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-sm text-gray-600">Member since</span>
              <span class="text-sm font-medium">January 2024</span>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex gap-2">
            <Button variant="primary" size="sm">Edit Profile</Button>
            <Button variant="outline" size="sm">Settings</Button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const ProductCard: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card class="w-[500px]">
        <template #header>
          <div class="aspect-video bg-gray-200 -mx-6 -mt-4 mb-4 flex items-center justify-center">
            <span class="text-gray-400">Product Image</span>
          </div>
          <h3 class="text-lg font-semibold">Premium Headphones</h3>
        </template>
        <template #content>
          <p class="text-sm text-gray-600 mb-4">
            High-quality wireless headphones with noise cancellation and 30-hour battery life.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold">$299.99</span>
            <span class="text-sm text-emerald-600 font-medium">In Stock</span>
          </div>
        </template>
        <template #footer>
          <Button variant="primary" size="md" class="w-full">Add to Cart</Button>
        </template>
      </Card>
    `,
  }),
}

export const MultipleCards: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-[500px]">
        <Card>
          <template #header>
            <h3 class="text-lg font-semibold">Card 1</h3>
          </template>
          <template #content>
            <p class="text-sm text-gray-600">First card content</p>
          </template>
        </Card>
        <Card>
          <template #header>
            <h3 class="text-lg font-semibold">Card 2</h3>
          </template>
          <template #content>
            <p class="text-sm text-gray-600">Second card content</p>
          </template>
        </Card>
        <Card>
          <template #header>
            <h3 class="text-lg font-semibold">Card 3</h3>
          </template>
          <template #content>
            <p class="text-sm text-gray-600">Third card content</p>
          </template>
        </Card>
      </div>
    `,
  }),
}
