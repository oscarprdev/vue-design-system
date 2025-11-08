<script setup lang="ts">
// 1. Imports
import type { PlusProps } from './plus.types'

// 2. Props
withDefaults(defineProps<PlusProps>(), {
  size: 24,
  color: 'currentColor',
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_4418_3716)">
      <path d="M12 18V6" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16 12H18" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 12H11.66" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 18V6" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4418_3716">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
