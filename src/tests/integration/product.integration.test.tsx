import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { ProductDetails } from '@/components/ProductPage/ProductDetails'
import { CartProvider } from '@/providers/CartProvider'
import { TProduct } from '@/types/product.types'

const mockProduct: TProduct = {
  id: '2',
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

describe('Integração: Componente de Produto', () => {
  beforeEach(() => {
    window.localStorage.removeItem('cart')
  })

  afterEach(() => {
    window.localStorage.removeItem('cart')
  })

  it('adiciona um novo item ao carrinho', async () => {
    render(
      <CartProvider>
        <ProductDetails product={mockProduct} />
      </CartProvider>
    )

    // Seleciona tamanho
    const sizeBtn = screen.getByText('38')
    await fireEvent.click(sizeBtn)

    // Seleciona cor
    const colorBtn = screen.getByText('Preto')
    await fireEvent.click(colorBtn)

    // Clica em adicionar ao carrinho
    const addBtn = screen.getByText(/adicionar ao carrinho/i)
    await fireEvent.click(addBtn)

    // Verifica se o item foi adicionado ao localStorage
    const cart = JSON.parse(window.localStorage.getItem('cart') || '[]')
    expect(cart.length).toBe(1)
    expect(cart[0].id).toBe('2')
    expect(cart[0].selectedSize).toBe(38)
    expect(cart[0].selectedColor).toBe('Preto')
  })
})
