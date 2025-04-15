import { ShoppingBag } from 'lucide-react'

import { Button } from '../ui'

export const EmptyCartPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex min-h-full flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="text-muted-foreground mb-4 h-16 w-16" />
        <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mt-2">
          Parece que você ainda não adicionou produtos ao carrinho.
        </p>
        <Button asChild className="mt-6">
          <a href="/">Continuar Comprando</a>
        </Button>
      </div>
    </div>
  )
}
