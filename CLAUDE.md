# Vue Component Standards

## File Structure

Script tag ALWAYS before template:

```vue
<script setup lang="ts">
// Script here
</script>

<template>
  <!-- Template here -->
</template>
```

## Script Content Order

### 1. Imports
Import order: Vue core → Types → Composables → Utils → Components → Assets

```typescript
import { ref, computed, watch, onMounted } from 'vue'
import type { ComponentProps } from './component.types'
import { useComposable } from '@/composables/useComposable'
```

### 2. Props
- Props interface from separate `.types.ts` file
- Use `withDefaults()` for defaults
- Assign to `const props` when referenced

```typescript
const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'primary',
})
```

### 3. Emits
- TypeScript type annotations
- camelCase event names

```typescript
const emit = defineEmits<{
  change: [value: string]
  click: [event: MouseEvent]
}>()
```

### 4. Composables
- Destructure returned values
- Group related composables

```typescript
const { isOpen, toggle, close } = useDisclosure()
```

### 5. Reactive State
- Group related refs
- Template refs use `Ref` suffix

```typescript
const isVisible = ref(false)
const contentRef = ref<HTMLElement | null>(null)
```

### 6. Computed
- Meaningful names
- Keep logic simple

```typescript
const displayValue = computed(() => props.modelValue || props.placeholder)
```

### 7. Watchers
- For side effects only
- Focused callbacks

```typescript
watch(isOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})
```

### 8. Methods/Handlers
- Prefix event handlers with `handle`
- Action methods use verb names
- Keep small and focused

```typescript
const handleClick = (event: MouseEvent) => emit('click', event)
const toggle = () => { isVisible.value = !isVisible.value }
```

### 9. Lifecycle Hooks
- Last in script
- Order chronologically

```typescript
onMounted(() => console.log('Mounted'))
```

## Complete Example

```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { MyComponentProps } from './my-component.types'
import { useDisclosure } from '@/composables/useDisclosure'

const props = withDefaults(defineProps<MyComponentProps>(), {
  variant: 'primary',
})

const emit = defineEmits<{ change: [value: string] }>()

const { isOpen, toggle } = useDisclosure()

const selectedValue = ref('')

const displayValue = computed(() => selectedValue.value || props.placeholder)

watch(isOpen, (value) => { if (value) emit('change', selectedValue.value) })

const handleClick = () => toggle()

onMounted(() => console.log('Mounted'))
</script>

<template>
  <div @click="handleClick">{{ displayValue }}</div>
</template>
```

## Type Files

Separate `.types.ts` file for all interfaces:

```typescript
// my-component.types.ts
export interface MyComponentProps {
  variant?: 'primary' | 'secondary'
  placeholder?: string
}
```

Rules:
- Export all interfaces/types
- PascalCase naming
- Props interface: `[ComponentName]Props`
- Import with `import type { ... }`

## Checklist

- [ ] Script before template
- [ ] Imports grouped correctly
- [ ] Props from `.types.ts` file
- [ ] Emits with TypeScript types
- [ ] Composables before state
- [ ] Refs grouped
- [ ] Computed grouped
- [ ] Watchers before methods
- [ ] Handlers clearly named
- [ ] Lifecycle hooks last
