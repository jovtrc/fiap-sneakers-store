import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <div>isso fica no __root.tsx</div>,
})
