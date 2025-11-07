# Design System

A Vue 3 design system built with TypeScript, Tailwind CSS v4, and Storybook.

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

### Build

Build the project:

```bash
npm run build
```

Build Storybook:

```bash
npm run build-storybook
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:** `primary`, `secondary`, `outline`, `ghost`
**Sizes:** `sm`, `md`, `lg`

```vue
<Button variant="primary" size="md">Click me</Button>
```

### Accordion

A composable accordion component with expandable/collapsible sections.

**Components:** `AccordionRoot`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
**Variants:** `default`, `bordered`, `filled`
**Features:** Single or multiple items open, custom icons, smooth animations

```vue
<AccordionRoot variant="bordered" :multiple="true">
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</AccordionRoot>
```

### Alert

An alert component for displaying notifications and messages.

**Variants:** `default`, `success`, `warning`, `error`
**Features:** Title, description, custom icons, custom content

```vue
<Alert variant="success" title="Success" description="Your changes have been saved." />
```

### Avatar

An avatar component for displaying user profile images with fallback support.

**Sizes:** `sm`, `md`, `lg`
**Props:** `src`, `fallback`, `size`, `border-color` (optional)
**Features:** Image loading with error handling, fallback text (shows first 2 characters), optional colored border

```vue
<Avatar src="https://example.com/avatar.jpg" fallback="JD" size="md" border-color="#3b82f6" />
```

### Badge

A badge component for displaying status, labels, and tags with optional icons.

**Variants:** `success`, `error`, `warning`, `info`
**Props:** `variant`, `outline` (boolean)
**Slots:** `iconLeft`, `iconRight`, default
**Features:** Solid and outline styles with customizable left and right icons

```vue
<Badge variant="success">
  <template #iconLeft>
    <TickIcon :size="14" />
  </template>
  Completed
</Badge>
```

### Breadcrumb

A breadcrumb component for displaying navigation paths with collapsible items.

**Props:** `items` (array of `BreadcrumbItem`)
**BreadcrumbItem Type:** `{ id: string, text: string, visible: boolean }`
**Events:** `@click` (emits the `id` of the clicked item)
**Features:** Hover effects on text, ellipsis for hidden items, keyboard navigation

```vue
<Breadcrumb
  :items="[
    { id: 'home', text: 'Home', visible: true },
    { id: 'hidden', text: 'Hidden', visible: false },
    { id: 'current', text: 'Current Page', visible: true },
  ]"
  @click="handleBreadcrumbClick"
/>
```

### Checkbox

A checkbox component with custom styling and icons.

**Props:** `label` (optional), `checked` (boolean), `id` (optional)
**Events:** `@change` (emits the new checked state as boolean)
**Features:** Custom checkbox icons, accessible with hidden native input, keyboard support

```vue
<Checkbox label="Accept terms and conditions" :checked="isChecked" @change="handleChange" id="terms" />
```

## Tech Stack

- Vue 3
- TypeScript
- Tailwind CSS v4
- Storybook
- Vite
