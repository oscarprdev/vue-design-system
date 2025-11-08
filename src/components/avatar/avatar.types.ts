import type { AvatarSize } from '@/theme/avatar'

export interface AvatarProps {
  src?: string
  fallback?: string
  borderColor?: string
  size?: AvatarSize
  alt?: string
}
