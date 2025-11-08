# Vue Component Coding Standards

This document outlines the coding standards for Vue components in this project.

## Component File Structure

### 1. Tag Order

All Vue Single File Components (SFC) must follow this tag order:

```vue
<script setup lang="ts">
// Script content here
</script>

<template>
  <!-- Template content here -->
</template>
```

**Rule:** Script tag ALWAYS comes before the template tag.

---

## Script Tag Content Order

Inside the `<script setup lang="ts">` tag, content must be organized in the following order:

### 1. Imports
All import statements at the top of the script section.

```typescript
import { ref, computed, watch, onMounted } from 'vue'
import type { ComponentProps } from './component.types'
import { useComposable } from '@/composables/useComposable'
```

**Order within imports:**
1. Vue core imports (`ref`, `computed`, `watch`, etc.)
2. Type imports (using `import type`)
3. Composable imports
4. Utility/helper imports
5. Component imports
6. Asset imports (icons, images, etc.)

### 2. Props Definition

Define component props using TypeScript interfaces from separate type files.

```typescript
const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'primary',
  size: 'md',
})
```

**Rules:**
- Props interface must be imported from a separate `.types.ts` file
- Use `withDefaults()` when default values are needed
- Assign to `const props` when props are referenced in the script

### 3. Emits Definition

Define component events using TypeScript type annotations.

```typescript
const emit = defineEmits<{
  change: [value: string]
  click: [event: MouseEvent]
}>()
```

**Rules:**
- Use TypeScript type annotations for emit signatures
- Assign to `const emit` when emits are used in the script
- Event names should be in camelCase

### 4. Composables / Hooks

Use Vue composables and custom hooks.

```typescript
const { isOpen, toggle, close } = useDisclosure()
const { focusTrap } = useFocusTrap(elementRef)
```

**Rules:**
- Composables that provide reactive state or functionality
- Destructure returned values for clarity
- Group related composables together

### 5. Reactive State (Refs & Reactive)

Declare reactive state using `ref()` and `reactive()`.

```typescript
const isVisible = ref(false)
const count = ref(0)
const state = reactive({
  loading: false,
  data: null,
})
```

**Rules:**
- Group related refs together
- Use descriptive variable names
- Template refs (for DOM elements) should be named with `Ref` suffix (e.g., `contentRef`)

### 6. Computed Properties

Define computed properties using the `computed()` function.

```typescript
const displayValue = computed(() => {
  return props.modelValue || props.placeholder
})

const isActive = computed(() => state.loading && count.value > 0)
```

**Rules:**
- Group computed properties together
- Use meaningful names that describe what is computed
- Keep computed logic simple; extract complex logic to separate functions if needed

### 7. Watchers

Define watchers using `watch()` or `watchEffect()`.

```typescript
watch(() => props.modelValue, (newValue) => {
  console.log('Value changed:', newValue)
})

watch(isOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
```

**Rules:**
- Watch should be used for side effects
- Use immediate and deep options when necessary
- Keep watcher callbacks focused on a single concern

### 8. Methods / Handlers

Define methods and event handlers as regular functions.

```typescript
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const toggle = () => {
  isVisible.value = !isVisible.value
}

const selectItem = (item: string) => {
  emit('change', item)
  close()
}
```

**Rules:**
- Event handlers should be prefixed with `handle` (e.g., `handleClick`, `handleChange`)
- Action methods use descriptive verb names (e.g., `toggle`, `selectItem`, `close`)
- Keep handlers small and focused
- Extract complex logic to utility functions

### 9. Lifecycle Hooks

Use Vue lifecycle hooks at the end of the script section.

```typescript
onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  cleanup()
})

onBeforeMount(() => {
  initialize()
})
```

**Rules:**
- Lifecycle hooks come last in the script
- Order lifecycle hooks chronologically (onBeforeMount → onMounted → onUpdated → onUnmounted)
- Keep lifecycle hook callbacks simple; extract complex setup to separate functions

---

## Complete Example

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, watch, onMounted } from 'vue'
import type { MyComponentProps, MyComponentItem } from './my-component.types'
import { useDisclosure } from '@/composables/useDisclosure'
import { formatValue } from '@/utils/format'

// 2. Props
const props = withDefaults(defineProps<MyComponentProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

// 3. Emits
const emit = defineEmits<{
  change: [value: string]
  click: [event: MouseEvent]
}>()

// 4. Composables / Hooks
const { isOpen, toggle, close } = useDisclosure()

// 5. Reactive State
const selectedValue = ref<string>('')
const contentRef = ref<HTMLElement | null>(null)

// 6. Computed Properties
const displayValue = computed(() => {
  return formatValue(selectedValue.value) || props.placeholder
})

const isDisabled = computed(() => props.disabled || !selectedValue.value)

// 7. Watchers
watch(isOpen, (value) => {
  if (value) {
    emit('change', selectedValue.value)
  }
})

// 8. Methods / Handlers
const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    toggle()
    emit('click', event)
  }
}

const selectItem = (item: MyComponentItem) => {
  selectedValue.value = item.value
  close()
}

// 9. Lifecycle Hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div ref="contentRef" @click="handleClick">
    {{ displayValue }}
  </div>
</template>
```

---

## Type Definitions

### Separate Type Files

All TypeScript interfaces and types for a component must be defined in a separate file with the `.types.ts` suffix.

**Naming Convention:**
- Component file: `my-component.vue`
- Type file: `my-component.types.ts`

**Example: `my-component.types.ts`**

```typescript
export interface MyComponentItem {
  value: string
  label: string
  disabled?: boolean
}

export interface MyComponentProps {
  items: MyComponentItem[]
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}
```

**Rules:**
- Always export interfaces and types
- Use PascalCase for interface names
- Props interface should be named `[ComponentName]Props`
- Related types (like item types) should be in the same file
- Import types in the component using `import type { ... }`

---

## Summary Checklist

When creating or reviewing a Vue component, ensure:

- [ ] Script tag appears before template tag
- [ ] Imports are at the top, grouped by category
- [ ] Props are defined with TypeScript types from separate `.types.ts` file
- [ ] Emits are defined with TypeScript type annotations
- [ ] Composables/hooks are used before reactive state
- [ ] Reactive state (refs/reactive) are declared together
- [ ] Computed properties are grouped together
- [ ] Watchers are placed before methods
- [ ] Methods and handlers are clearly named and focused
- [ ] Lifecycle hooks are at the end of the script
- [ ] All types/interfaces are in a separate `.types.ts` file
- [ ] Code follows consistent spacing and organization

---

## Benefits

Following these standards ensures:

1. **Consistency:** All components follow the same structure, making the codebase predictable
2. **Readability:** Developers can quickly find what they need in any component
3. **Maintainability:** Clear organization makes refactoring and debugging easier
4. **Type Safety:** Separate type files improve type reusability and clarity
5. **Scalability:** New team members can easily understand and follow the patterns
6. **Best Practices:** Aligns with Vue 3 Composition API and TypeScript conventions

---

**Last Updated:** 2025-11-08
