<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" :fill="color">
    <g clip-path="url(#clip0_4418_8574)">
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.03 14.97C16.32 15.26 16.32 15.74 16.03 16.03C15.88 16.18 15.69 16.25 15.5 16.25C15.31 16.25 15.12 16.18 14.97 16.03L12 13.06L9.03 16.03C8.88 16.18 8.69 16.25 8.5 16.25C8.31 16.25 8.12 16.18 7.97 16.03C7.68 15.74 7.68 15.26 7.97 14.97L10.94 12L7.97 9.03C7.68 8.74 7.68 8.26 7.97 7.97C8.26 7.68 8.74 7.68 9.03 7.97L12 10.94L14.97 7.97C15.26 7.68 15.74 7.68 16.03 7.97C16.32 8.26 16.32 8.74 16.03 9.03L13.06 12L16.03 14.97Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_4418_8574">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
export interface ErrorProps {
  size?: number | string
  color?: string
}

withDefaults(defineProps<ErrorProps>(), {
  size: 24,
  color: 'currentColor',
})
</script>
