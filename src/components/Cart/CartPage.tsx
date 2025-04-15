import { useCart } from '@/providers'

import { CartDetails } from './CartDetails'
import { EmptyCartPage } from './EmptyCart'

export function CartPage() {
  const { cartItems } = useCart()

  if (cartItems.length === 0) {
    return <EmptyCartPage />
  }

  return <CartDetails />
}
