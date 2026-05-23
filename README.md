# TanStack Start `ssr: false` Route Error Check

This repository was originally created for [TanStack/router#7412](https://github.com/TanStack/router/issues/7412).

The original report was based on an invalid dependency setup: `@vitejs/plugin-react@6`
was installed with Vite 6. After updating the project to Vite 8, the reported
`react-dom/server.browser.js` default-export SyntaxError no longer reproduces.

Current result: the `ssr: false` route renders its route `errorComponent`, and
the browser console shows the expected `UNAUTHENTICATED_ERROR` from the test
loader.

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

6. Observe that the route error component renders the expected
   `UNAUTHENTICATED_ERROR`.

## Outcome

With Vite 8, the browser did not request `renderRouterToString` or
`react-dom/server.browser.js` for this route transition. The issue was closed
because this repository no longer provides a valid reproduction of the reported
TanStack Router/Start bug.

If the same failure appears again under a supported setup, open a fresh issue
with a clean minimal reproduction.
