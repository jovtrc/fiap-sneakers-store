import { CatchNotFound } from '@tanstack/react-router'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ImagesCarousel } from '@/components/ProductPage'
import { Button } from '@/components/ui'
import { transformNumberToBrl } from '@/lib/formatter'
import { useCart } from '@/providers'
import { TProduct } from '@/types/product.types'

export interface ProductDetailsProps {
  product: TProduct | null
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<number>()
  const [selectedColor, setSelectedColor] = useState('')
  const { addToCart } = useCart()

  if (product === null) {
    return (
      <CatchNotFound>
        <p>caiu no 404</p>
      </CatchNotFound>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return

    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    })

    toast.success('Adicionado ao carrinho!', {
      description: `O sneaker ${product.name} foi adicionaro ao seu carrinho.`,
      descriptionClassName: '!text-muted-foreground',
    })
  }

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Produtos', href: '#' },
    { title: 'Sneakers', href: '#' },
    { title: product.name, href: '' },
  ]

  return (
    <div className="container mx-auto space-y-8 px-4 py-12">
      <Breadcrumbs items={breadcrumbItems} />

      <main className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <ImagesCarousel product={product} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold">
              {transformNumberToBrl(product.price)}
            </p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="size-selector">
              <h3 className="mb-2 font-medium">Tamanho</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    className="min-w-[60px] cursor-pointer"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Selecione um tamanho
                </p>
              )}
            </div>

            <div className="color-selector">
              <h3 className="mb-2 font-medium">Cor</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    className="min-w-[80px] cursor-pointer"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
              {!selectedColor && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Selecione uma cor
                </p>
              )}
            </div>

            <div className="quantity-selector">
              <h3 className="mb-2 font-medium">Quantidade</h3>
              <div className="flex items-center">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(product.stock_quantity, quantity + 1))
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            disabled={!selectedSize || !selectedColor}
            onClick={handleAddToCart}
            data-testid="add-to-cart-button"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar ao Carrinho
          </Button>

          <ul className="grid grid-cols-1 gap-4 border-t pt-6">
            <li>
              <h4 className="font-medium">Métodos de pagamento</h4>
              <p className="text-muted-foreground text-sm">
                Aceitamos pagamentos no cartão de crédito e débito, além de PIX
                na loja.
              </p>
            </li>
            <li>
              <h4 className="font-medium">Métodos de entrega</h4>
              <p className="text-muted-foreground text-sm">
                Retirada grátis na loja.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
