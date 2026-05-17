import * as React from 'react'
import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
  Link,
  type ErrorComponentProps,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Reproducer' },
    ],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent,
})

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <RootDocument>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: 'red' }}>Root Error Boundary Caught:</h1>
        <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <button onClick={reset}>Reset</button>
      </div>
    </RootDocument>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/protected">Protected Route (ssr: false)</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
