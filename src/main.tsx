import './index.css'

import Clarity from '@microsoft/clarity'
import * as Sentry from '@sentry/react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { CartProvider, ThemeProvider } from './providers'
import { SessionProvider } from './providers/SessionProvider'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

Clarity.init('qth0a3aevj')

Sentry.init({
  dsn: 'https://19fc5e4456581cedb583cff7be0b3fdd@o4509034035544064.ingest.us.sentry.io/4509034042687488',
})

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="sneakershub:theme">
        <SessionProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </SessionProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
