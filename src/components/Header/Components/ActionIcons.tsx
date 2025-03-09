import { ShoppingCart, User } from 'lucide-react'

import { ThemeToggler } from '@/components/ThemeToggler'
import { Button } from '@/components/ui'
import { useCart } from '@/providers'

const ActionIcons = () => {
  return (
    <>
      <AccountButton />
      <CartButton />

      <ThemeToggler />
    </>
  )
}

export default ActionIcons

const AccountButton = () => {
  return (
    <Button variant="ghost" size="icon" className="cursor-pointer">
      <User className="h-5 w-5" />
      <span className="sr-only">Account</span>
    </Button>
  )
}

const CartButton = () => {
  const { cartItems } = useCart()
  const cartItemCount = cartItems.length

  return (
    <a href="/cart">
      <Button variant="ghost" size="icon" className="relative cursor-pointer">
        <ShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium">
            {cartItemCount}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Button>
    </a>
  )
}
