<script setup lang="ts">
import { breadcrumbStyles } from '@/theme/breadcrumb'
import { ArrowRightIcon } from '@/components/icons'
import type { BreadcrumbItem, BreadcrumbProps } from './breadcrumb.types'

const props = defineProps<BreadcrumbProps>()

const emit = defineEmits<{
  click: [id: string]
}>()

function handleClick(id: string) {
  emit('click', id)
}

function isLastVisibleItem(index: number): boolean {
  const visibleItems = props.items.filter(item => item.visible)
  const lastVisibleItem = visibleItems.length ? visibleItems.at(-1) : null
  const lastVisibleItemIndex = props.items.findIndex(item => item.id === lastVisibleItem?.id)

  return index === lastVisibleItemIndex
}
</script>

<template>
  <nav :class="breadcrumbStyles.container" aria-label="Breadcrumb">
    <template v-for="(item, index) in props.items" :key="item.id">
      <span v-if="!item.visible" :class="breadcrumbStyles.ellipsis">...</span>
      <span v-else-if="isLastVisibleItem(index)" :class="breadcrumbStyles.currentItem" aria-current="page">
        {{ item.text }}
      </span>
      <span
        v-else
        :class="breadcrumbStyles.item"
        @click="handleClick(item.id)"
        role="button"
        tabindex="0"
        @keydown.enter="handleClick(item.id)"
        @keydown.space.prevent="handleClick(item.id)"
      >
        {{ item.text }}
      </span>
      <ArrowRightIcon
        v-if="index < props.items.length - 1"
        :size="16"
        :class="breadcrumbStyles.separator"
        aria-hidden="true"
      />
    </template>
  </nav>
</template>
