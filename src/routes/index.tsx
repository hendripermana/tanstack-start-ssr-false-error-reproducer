import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>Welcome to the Reproducer</h1>
      <p>
        Click the link above to navigate to the protected route (configured with{' '}
        <code>ssr: false</code>).
      </p>
      <p>
        When you do, its loader will invoke a server function that throws an
        error. This should render the route error boundary.
      </p>
      <p>
        With the corrected Vite 8 setup, the old SyntaxError no longer
        reproduces. The expected result is:
      </p>
      <pre style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px' }}>
        Route Error Component: UNAUTHENTICATED_ERROR
      </pre>
    </div>
  )
}
