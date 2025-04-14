// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import React from 'react'
// import { MemoryRouter } from 'react-router-dom'
// import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// import { CartProvider } from '@/providers/CartProvider'
// import { RouteComponent as CheckoutPage } from '@/routes/checkout/index'

// describe('Integração: Checkout', () => {
//   it('exibe mensagem de erro ao tentar finalizar compra com carrinho vazio', async () => {
//     render(
//       <MemoryRouter initialEntries={['/checkout']}>
//         <CartProvider>
//           <CheckoutPage />
//         </CartProvider>
//       </MemoryRouter>
//     )
//     // Espera pelo botão de finalizar compra (deve estar desabilitado ou ausente)
//     const finalizarBtn = screen.queryByText(/finalizar compra/i)
//     expect(finalizarBtn).not.toBeInTheDocument()
//     // Poderia checar por mensagem de carrinho vazio, se existir
//   })
// })
