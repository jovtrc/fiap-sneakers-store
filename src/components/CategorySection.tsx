import { Card, CardContent } from '@/components/ui'

export function CategorySection() {
  const categories = [
    {
      name: 'Nike',
      image:
        'https://images.unsplash.com/photo-1571601035754-5c927f2d7edc?q=80&w=500&h=500&auto=format&fit=crop',
      href: '/products/men',
    },
    {
      name: 'Adidas',
      image:
        'https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?q=80&w=500&h=500&auto=format&fit=crop',
      href: '/products/women',
    },
    {
      name: 'New Balance',
      image:
        'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=500&h=500&auto=format&fit=crop',
      href: '/products/accessories',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="text-muted-foreground max-w-[600px]">
          Browse our collections and find your perfect style
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <a key={category.name} href={category.href}>
            <Card className="relative h-[300px] overflow-hidden p-0 transition-all hover:shadow-lg">
              <CardContent
                className="absolute inset-0 flex items-center justify-center bg-cover bg-center transition-transform duration-300 hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition-colors hover:bg-black/60" />
                <h3 className="relative text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
