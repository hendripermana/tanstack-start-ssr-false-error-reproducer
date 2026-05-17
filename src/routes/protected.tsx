import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

// Simulate a server function that throws an error
const someProtectedServerFn = createServerFn({ method: 'GET' }).handler(async () => {
  throw new Error('UNAUTHENTICATED_ERROR')
})

export const Route = createFileRoute('/protected')({
  ssr: false, // Opt out of SSR
  loader: async () => {
    // Call the server function that will throw an error
    await someProtectedServerFn()
    return null
  },
  component: Protected,
  errorComponent: RouteErrorComponent,
})

function Protected() {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>This should only render if authenticated.</p>
    </div>
  )
}

function RouteErrorComponent({ error, reset }: { error: any; reset: () => void }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid red', borderRadius: '4px', background: '#fff5f5' }}>
      <h2 style={{ color: '#c53030' }}>Route Error Component</h2>
      <p>Caught expected error: {error instanceof Error ? error.message : String(error)}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )
}
