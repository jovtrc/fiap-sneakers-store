import { Minus, Plus, ShoppingCart } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
} from '../ui'

export const PageLoading = () => {
  return (
    <div className="container mx-auto space-y-8 px-4 py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/">Produtos</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="bg-accent aspect-square w-full animate-pulse rounded-lg text-transparent"></div>

        <div className="space-y-6">
          <div>
            <h1 className="bg-accent w-8/12 animate-pulse text-3xl text-transparent">
              product.name
            </h1>
            <p className="bg-accent mt-2 w-fit animate-pulse text-2xl font-bold text-transparent">
              product.price
            </p>
          </div>

          <p className="bg-accent h-20 animate-pulse text-transparent">
            product.description
          </p>

          <div className="space-y-4">
            <div className="size-selector">
              <h3 className="bg-accent mb-2 w-fit animate-pulse font-medium text-transparent">
                product.size
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Button
                    key={index}
                    className="bg-accent min-w-[60px] animate-pulse cursor-pointer text-transparent"
                  >
                    {index}
                  </Button>
                ))}
              </div>
            </div>

            <div className="color-selector">
              <h3 className="bg-accent mb-2 w-fit animate-pulse font-medium text-transparent">
                product.color
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Button
                    key={index}
                    className="bg-accent min-w-[80px] animate-pulse cursor-pointer text-transparent"
                  >
                    {index}
                  </Button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <h3 className="bg-accent mb-2 w-fit animate-pulse font-medium text-transparent">
                product.quantity
              </h3>
              <div className="flex items-center">
                <Button
                  className="bg-accent animate-pulse cursor-pointer text-transparent"
                  variant="outline"
                  size="icon"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="bg-accent mx-2 w-12 animate-pulse rounded text-center text-transparent">
                  1
                </span>
                <Button
                  className="bg-accent animate-pulse cursor-pointer text-transparent"
                  variant="outline"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-accent w-full animate-pulse cursor-pointer text-transparent disabled:cursor-not-allowed"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            product.cart
          </Button>

          <ul className="grid grid-cols-1 gap-4 border-t pt-6">
            <li>
              <h4 className="bg-accent w-fit animate-pulse font-medium text-transparent">
                Métodos de pagamento
              </h4>
              <p className="bg-accent w-fit animate-pulse text-sm text-transparent">
                Aceitamos pagamentos no cartão de crédito e débito, além de PIX
                na loja.
              </p>
            </li>
            <li>
              <h4 className="bg-accent w-fit animate-pulse font-medium text-transparent">
                Métodos de entrega
              </h4>
              <p className="bg-accent w-fit animate-pulse text-sm text-transparent">
                Retirada grátis na loja.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
