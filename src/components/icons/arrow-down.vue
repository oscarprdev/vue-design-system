<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <path
      d="M16.01 12.8502L13.39 15.4702C12.62 16.2402 11.36 16.2402 10.59 15.4702L4.08002 8.9502"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.92 8.9502L18.88 9.9902"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
export interface ArrowDownProps {
  size?: number | string
  color?: string
}

withDefaults(defineProps<ArrowDownProps>(), {
  size: 24,
  color: 'currentColor',
})
</script>
