// app/routes/__root.tsx
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'

// Add this, notice the ?url
import appCss from '@/styles/globals.css?url'
import { TailwindIndicator } from '@/components/tailwind-indicator'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
        <script defer src='https://umami.stevegray.io/script.js' data-website-id='61e71d5b-925f-4008-a56c-a142ccc0e17e' />
      </head>
      <body>
        {children}
        <TailwindIndicator />
        <Scripts />
      </body>
    </html>
  )
}
