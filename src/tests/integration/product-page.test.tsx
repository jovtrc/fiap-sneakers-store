import { afterEach } from 'node:test'

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { ProductDetails } from '@/components/ProductPage'
import { CartProvider } from '@/providers'
import { TProduct } from '@/types/product.types'

const productMock: TProduct = {
  id: 'id-do-produto-de-teste',
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

describe('integração: página do produto', () => {
  beforeEach(() => {
    window.localStorage.removeItem('cart')
  })

  afterEach(() => {
    window.localStorage.removeItem('cart')
  })

  it('não pode adicionar um produto no carrinho sem selecionar cor e tamanho', () => {
    render(
      <CartProvider>
        <ProductDetails product={productMock} />
      </CartProvider>
    )

    const addToCartButton = screen.getByTestId('add-to-cart-button')

    expect(addToCartButton).toBeDisabled()
  })

  it('adicionar produto no carrinho', () => {
    render(
      <CartProvider>
        <ProductDetails product={productMock} />
      </CartProvider>
    )

    const sizeButton = screen.getByText('38')
    const colorButton = screen.getByText('Preto')
    const addToCartButton = screen.getByTestId('add-to-cart-button')

    fireEvent.click(sizeButton)
    fireEvent.click(colorButton)
    fireEvent.click(addToCartButton)

    const cartStorage = window.localStorage.getItem('cart') ?? ''
    const cartStorageArray: TProduct[] = JSON.parse(cartStorage) ?? []

    expect(cartStorageArray.length).toBe(1)
    expect(cartStorageArray[0].id).toBe('id-do-produto-de-teste')
    expect(cartStorageArray[0].selectedSize).toBe(38)
    expect(cartStorageArray[0].selectedColor).toBe('Preto')
  })
})
