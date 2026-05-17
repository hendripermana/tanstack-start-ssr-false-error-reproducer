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
        error. This will trigger the router error boundary.
      </p>
      <p>
        In development mode (<code>vite dev</code>), you will see a SyntaxError
        in the browser console:
      </p>
      <pre style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px' }}>
        Uncaught (in promise) SyntaxError: The requested module 'react-dom/server.browser.js' does not provide an export named 'default'
      </pre>
    </div>
  )
}
