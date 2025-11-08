<script setup lang="ts">
import { getDialogBodyClasses } from '../../theme/dialog'
</script>

<template>
  <div :class="getDialogBodyClasses()">
    <slot />
  </div>
</template>
