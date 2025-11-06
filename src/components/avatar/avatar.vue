<template>
  <div :class="avatarClasses" :style="avatarStyle">
    <img v-if="src && !imageError" :src="src" :alt="alt" :class="avatarStyles.image" @error="handleImageError" />
    <div v-else :class="avatarStyles.fallback">
      {{ fallbackText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { avatarStyles, getAvatarClasses, getAvatarStyle, type AvatarSize } from '@/theme/avatar'

export interface AvatarProps {
  src?: string
  fallback?: string
  borderColor?: string
  size?: AvatarSize
  alt?: string
}

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
