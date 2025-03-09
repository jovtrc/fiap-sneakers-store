import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  ),
  notFoundComponent: () => <div>isso fica no __root.tsx</div>,
})
