import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Toaster closeButton />
      <Footer />
    </>
  ),
  notFoundComponent: () => <div>isso fica no __root.tsx</div>,
})
