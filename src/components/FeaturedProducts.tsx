import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui'
import { transformNumberToBrl } from '@/lib/formatter'
import { supabase } from '@/repositories'

import { Tables } from '../types/database.types'

export function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState<Tables<'products'>[]>([])

  useEffect(() => {
    async function getTodos() {
      const { data } = await supabase.from('products').select()

      if (data && data.length > 1) {
        setAllProducts(data)
      }
    }

    getTodos()
  }, [])

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
        <p className="text-muted-foreground max-w-[600px]">
          Our most popular items, handpicked for you
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Tables<'products'> }) {
  return (
    <Card className="group border-primary-foreground overflow-hidden p-0 shadow-none">
      <a href={`/produtos/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-sm">Adidas</p>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="mt-1 font-bold">
            {transformNumberToBrl(product.price)}
          </p>
        </CardContent>
      </a>
    </Card>
  )
}
