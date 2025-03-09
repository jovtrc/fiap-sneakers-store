import { Menu } from 'lucide-react'

import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui'

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="mt-8 flex flex-col gap-4">
          <a href="/" className="text-lg font-medium">
            Home
          </a>
          <a href="/products" className="text-lg font-medium">
            All Products
          </a>
          <a href="/products/men" className="text-lg font-medium">
            Men
          </a>
          <a href="/products/women" className="text-lg font-medium">
            Women
          </a>
          <a href="/about" className="text-lg font-medium">
            About
          </a>
          <a href="/contact" className="text-lg font-medium">
            Contact
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
