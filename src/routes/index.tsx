import { createFileRoute } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'

import { FeaturedProducts } from '@/components/FeaturedProducts'
import { HeroSection } from '@/components/HeroSection'
import { Button } from '@/components/ui'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <HeroSection />

      <div className="container mx-auto space-y-16 px-4 py-12">
        <FeaturedProducts />

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
