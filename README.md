# TanStack Start `ssr: false` Route Error Reproducer

This repository is a minimal complete reproducer for the issue described in [TanStack/router#7412](https://github.com/TanStack/router/issues/7412).

## Steps to Reproduce

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

4. Open the browser's developer console (F12).

5. Click on **"Protected Route (ssr: false)"**.

6. Observe the uncaught promise SyntaxError in the browser console:
   ```
   Uncaught (in promise) SyntaxError: The requested module
   '/node_modules/.pnpm/react-dom@19.2.6_react@19.2.6/node_modules/react-dom/server.browser.js?v=b87af0c2'
   does not provide an export named 'default' (at renderRouterToString.js?v=b87af0c2:1:8)
   ```

## Root Cause

When the `loader` of the `/protected` route throws an error (triggered by the mock server function throwing `UNAUTHENTICATED_ERROR`), TanStack Router's error handling rendering path pulls in `renderRouterToString`.

In `renderRouterToString.js` in `@tanstack/react-router/dist/esm/ssr/renderRouterToString.js`, it does:
```javascript
import ReactDOMServer from "react-dom/server"
```

In the browser, Vite resolves `react-dom/server` to `react-dom/server.browser.js`. Because `react-dom/server.browser.js` is a CommonJS file that only has named exports (`exports.renderToString`, etc.) and does not define a `default` export in ES module resolution when processed by Vite, the import fails with a `SyntaxError`.

Since the route explicitly sets `ssr: false`, server-side rendering utilities should never be imported or executed in the client/browser environment during error rendering.
