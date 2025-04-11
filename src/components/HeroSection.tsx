import { Button } from '@/components/ui'

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
      <div
        className="relative flex h-[60vh] items-center justify-start bg-cover bg-left md:bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618677831708-0e7fda3148b4?q=80&w=1920&h=600&auto=format&fit=crop')",
        }}
      >
        <span className="absolute inset-0 z-0 bg-black/50"></span>
        <div className="relative container mx-auto px-4">
          <div className="max-w-lg space-y-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Seleção Premium de Sneakers
            </h1>
            <p className="text-lg md:text-xl">
              Curadoria especializada para oferecer os modelos mais cobiçados do
              mercado.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <a href="/products">Últimos Lançamentos</a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="/products/new">Promoções</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
