export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export const avatarStyles = {
  base: 'inline-flex items-center justify-center rounded-full overflow-hidden bg-neutral-200 text-neutral-700 font-medium select-none',

  sizes: {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  } as Record<AvatarSize, string>,

  image: 'w-full h-full object-cover',

  fallback: 'flex items-center justify-center w-full h-full uppercase',
}

/**
 * Get avatar classes with size and optional border color
 */
export function getAvatarClasses(size: AvatarSize = 'md', borderColor?: string): string {
  const classes = [avatarStyles.base, avatarStyles.sizes[size]]

  if (borderColor) {
    classes.push('ring-2 ring-offset-2')
  }

  return classes.join(' ')
}

/**
 * Get avatar style object for border color
 */
export function getAvatarStyle(borderColor?: string): Record<string, string> {
  if (borderColor) {
    return {
      '--tw-ring-color': borderColor,
    }
  }
  return {}
}
