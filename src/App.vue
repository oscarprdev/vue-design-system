<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-gray-900">Design System</h1>
      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Buttons</h2>
          <div class="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Sizes</h2>
          <div class="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">States</h2>
          <div class="flex gap-4">
            <Button disabled>Disabled</Button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from './components/button'
</script>
