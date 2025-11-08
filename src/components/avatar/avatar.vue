<script setup lang="ts">
import { computed, ref } from 'vue'
import { avatarStyles, getAvatarClasses, getAvatarStyle } from '@/theme/avatar'
import type { AvatarProps } from './avatar.types'

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  alt: 'Avatar',
})

const imageError = ref(false)

const avatarClasses = computed(() => getAvatarClasses(props.size, props.borderColor))
const avatarStyle = computed(() => getAvatarStyle(props.borderColor))

const fallbackText = computed(() => {
  if (props.fallback) {
    return props.fallback.slice(0, 2)
  }
  return '?'
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div :class="avatarClasses" :style="avatarStyle">
    <img v-if="src && !imageError" :src="src" :alt="alt" :class="avatarStyles.image" @error="handleImageError" />
    <div v-else :class="avatarStyles.fallback">
      {{ fallbackText }}
    </div>
  </div>
</template>
