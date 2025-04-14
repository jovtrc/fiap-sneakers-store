// import { render, screen } from '@testing-library/react'
// import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// import { CartProvider } from '@/providers/CartProvider'
// import { ShoppingCart as CartPage } from '@/routes/carrinho'

// const mockProduct = {
//   id: '1',
//   name: 'Tênis de Teste',
//   price: 299.99,
//   images: ['/img.jpg'],
//   slug: 'tenis-teste',
//   description: 'Um tênis para testes',
//   sizes: [37, 38, 39],
//   colors: ['Preto', 'Branco'],
//   stock_quantity: 5,
// }

// describe('Integração: Carrinho', () => {
//   beforeEach(() => {
//     window.localStorage.removeItem('cart')
//   })

//   afterEach(() => {
//     window.localStorage.removeItem('cart')
//   })

//   it('fluxo completo do carrinho', async () => {
//     render(
//       <CartProvider>
//         <CartPage />
//       </CartProvider>
//     )

//     // Estado inicial: carrinho vazio
//     expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument()

//     // Adiciona produto ao carrinho simulando localStorage
//     window.localStorage.setItem(
//       'cart',
//       JSON.stringify([
//         {
//           ...mockProduct,
//           selectedSize: 38,
//           selectedColor: 'Preto',
//           quantity: 1,
//         },
//       ])
//     )

//     // Re-renderiza para refletir o novo estado
//     render(
//       <CartProvider>
//         <CartPage />
//       </CartProvider>
//     )

//     // Verifica se o produto aparece no carrinho
//     expect(screen.getByText('Tênis de Teste')).toBeInTheDocument()
//     expect(screen.getByText('38')).toBeInTheDocument()
//     expect(screen.getByText('Preto')).toBeInTheDocument()
//     expect(screen.getByText('1')).toBeInTheDocument()

//     // Aumenta a quantidade
//     const increaseBtn = screen.getByLabelText(/aumentar quantidade/i)
//     await increaseBtn.click()
//     expect(screen.getByText('2')).toBeInTheDocument()

//     // Diminui a quantidade
//     const decreaseBtn = screen.getByLabelText(/diminuir quantidade/i)
//     await decreaseBtn.click()
//     expect(screen.getByText('1')).toBeInTheDocument()

//     // Remove item
//     const removeBtn = screen.getByLabelText(/remover/i)
//     await removeBtn.click()
//     expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument()

//     // Limpa carrinho
//     window.localStorage.setItem(
//       'cart',
//       JSON.stringify([
//         {
//           ...mockProduct,
//           selectedSize: 38,
//           selectedColor: 'Preto',
//           quantity: 1,
//         },
//       ])
//     )
//     render(
//       <CartProvider>
//         <CartPage />
//       </CartProvider>
//     )
//     const clearBtn = screen.getByText(/limpar carrinho/i)
//     await clearBtn.click()
//     expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument()
//   })
// })
