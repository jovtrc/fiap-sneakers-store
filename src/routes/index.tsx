import { createFileRoute } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'

import { FeaturedProducts } from '@/components/FeaturedProducts'
import { HeroSection } from '@/components/HeroSection'
import { Button } from '@/components/ui'
import { supabase } from '@/repositories'
import { TProduct } from '@/types/product.types'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [allProducts, setAllProducts] = useState<TProduct[]>([])

  useEffect(() => {
    async function getProducts() {
      const { data }: { data: TProduct[] | null } = await supabase
        .from('products')
        .select()

      if (data && data.length > 1) {
        setAllProducts(data)
      }
    }

    getProducts()
  }, [])

  return (
    <>
      <HeroSection />

      <div className="container mx-auto space-y-16 px-4 py-12">
        <FeaturedProducts products={allProducts} />

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Acesso Exclusivo aos Sneakers Mais Raros
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Para colecionadores e entusiastas: garanta peças únicas antes que
            esgotem.
          </p>
          <Button asChild size="lg">
            <a href="/">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Conferir lançamentos
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
