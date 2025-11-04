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
<Alert
  variant="success"
  title="Success"
  description="Your changes have been saved."
/>
```

## Tech Stack

- Vue 3
- TypeScript
- Tailwind CSS v4
- Storybook
- Vite

