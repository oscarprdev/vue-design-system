<script setup lang="ts">
import { getDialogFooterClasses } from '../../theme/dialog'
</script>

<template>
  <div :class="getDialogFooterClasses()">
    <slot />
  </div>
</template>
