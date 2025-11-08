<script setup lang="ts">
// 1. Imports
import type { CheckboxUncheckedProps } from './checkbox-unchecked.types'

// 2. Props
withDefaults(defineProps<CheckboxUncheckedProps>(), {
  size: 24,
  color: 'currentColor',
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_4418_6166)">
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4418_6166">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
