import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FeaturedProducts, ProductCard } from '@/components/FeaturedProducts'
import { TProduct } from '@/types/product.types'

const productMock: TProduct = {
  id: '1',
  name: 'Air Max 270',
  slug: 'air-max-270',
  brand: 'Nike',
  category: 'Sneakers',
  description: 'Um sneaker confortável e estiloso.',
  material: 'Malha respirável',
  sizes: [38, 39, 40, 41, 42],
  colors: ['Preto', 'Branco'],
  stock_quantity: 10,
  price: 499.99,
  sale_end_date: null,
  sale_price: null,
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
}

describe('Componente de cards de produtos', () => {
  it('deve renderizar o ProductCard corretamente', () => {
    render(<ProductCard product={productMock} />)

    expect(screen.getByText(productMock.name)).toBeInTheDocument()
    expect(screen.getByText('R$ 499,99')).toBeInTheDocument()
  })

  it('deve renderizar uma lista de produtos destacados', () => {
    const products = [
      {
        ...productMock,
        id: '2',
        name: 'Vans Oldskool',
      },
      {
        ...productMock,
        id: '3',
        name: 'Adidas Superstar',
      },
      {
        ...productMock,
        id: '4',
        name: 'Puma RS-X',
      },
      {
        ...productMock,
        id: '5',
        name: 'Reebok Classic',
      },
    ]

    render(<FeaturedProducts products={products} />)

    expect(screen.getByText('Destaques')).toBeInTheDocument()

    expect(screen.getAllByTestId('product-card-link')).toHaveLength(
      products.length
    )
  })
})
