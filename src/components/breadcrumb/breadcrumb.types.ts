export interface BreadcrumbItem {
  id: string
  text: string
  visible: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}
