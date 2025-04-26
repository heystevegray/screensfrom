import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

const Container = ({
  children,
  className,
  mt = false,
  main = false,
  maxWidth = false,
}: {
  className?: string
  main?: boolean
  mt?: boolean
  maxWidth?: boolean
} & PropsWithChildren) => {
  const sharedClassName = cn('mx-auto w-full p-4 md:p-6 md:py-2 max-w-3xl lg:max-w-6xl space-y-12', {
    'mt-32': mt,
    'max-w-xl lg:max-w-xl': maxWidth,
  })

  if (main) {
    return <main className={cn('mb-24', sharedClassName, className)}>{children}</main>
  }

  return <div className={cn(sharedClassName, className)}>{children}</div>
}

export default Container
