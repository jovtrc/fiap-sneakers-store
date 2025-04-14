import { Card, CardContent } from '@/components/ui'
import { transformNumberToBrl } from '@/lib/formatter'
import { TProduct } from '@/types/product.types'

export function FeaturedProducts({ products }: { products: TProduct[] }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Destaques</h2>
        <p className="text-muted-foreground max-w-[600px]">
          Não deixe escapar a oportunidade de ter um sneaker exclusivo.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export function ProductCard({ product }: { product: TProduct }) {
  return (
    <Card className="group border-primary-foreground overflow-hidden p-0 shadow-none">
      <a href={`/produtos/${product.slug}`} data-testid="product-card-link">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-sm">Adidas</p>
          <h3 className="text-lg font-medium" data-testid="product-cart-title">
            {product.name}
          </h3>
          <p className="mt-1 font-bold">
            {transformNumberToBrl(product.price)}
          </p>
        </CardContent>
      </a>
    </Card>
  )
}
