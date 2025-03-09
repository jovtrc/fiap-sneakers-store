import './index.css'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { CartProvider, ThemeProvider } from './providers'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="sneakershub:theme">
        <CartProvider>
          <RouterProvider router={router} />
          {/* <div className="flex min-h-screen flex-col">
              <App />
            </div> */}
        </CartProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
