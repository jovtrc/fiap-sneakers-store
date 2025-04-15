import { createFileRoute } from '@tanstack/react-router'

import { CartPage } from '@/components/Cart/CartPage'

export const Route = createFileRoute('/carrinho')({
  component: ShoppingCart,
})

export function ShoppingCart() {
  return <CartPage />
}
