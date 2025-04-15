import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link } from '@tanstack/react-router'
import { Minus, Plus, Trash } from 'lucide-react'

import { transformNumberToBrl } from '@/lib/formatter'
import { useCart } from '@/providers'
import { TProduct } from '@/types/product.types'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui'

export const CartDetails = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Carrinho de compras</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item: TProduct) => (
            <Card key={item.id} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-[120px] w-full sm:w-[120px]">
                    <Link to={`/produtos/$slug`} params={{ slug: item.slug }}>
                      <img
                        src={item.images[0] || '/placeholder.svg'}
                        alt={item.name}
                        className="object-cover"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <Link to={`/produtos/$slug`} params={{ slug: item.slug }}>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {item.selectedSize && `Tamanho: ${item.selectedSize}`}
                          {item.selectedColor && `, Cor: ${item.selectedColor}`}
                        </p>
                        <p className="mt-1 font-bold">
                          {transformNumberToBrl(item.price)}
                        </p>
                      </Link>
                    </div>
                    <div className="mt-4 flex items-center sm:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span
                        className="w-10 text-center"
                        data-testid="product-quantity"
                      >
                        {item.quantity || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-8 w-8 cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={clearCart}>
              Limpar Carrinho
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Continuar Comprando</Link>
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{transformNumberToBrl(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega</span>
                <span>Retirar na Loja</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span data-testid="cart-total-price">
                  {transformNumberToBrl(subtotal)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/checkout">Finalizar compra</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
