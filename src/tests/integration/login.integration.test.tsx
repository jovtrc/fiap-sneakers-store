// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import React from 'react'
// import { MemoryRouter } from 'react-router-dom'
// import { afterEach, beforeEach, describe, expect, it } from 'vitest'

// import { SessionProvider } from '@/providers/SessionProvider'
// import LoginPage from '@/routes/login'

// describe('Integração: Login', () => {
//   beforeEach(() => {
//     // Setup inicial, se necessário
//   })

//   afterEach(() => {
//     // Cleanup, se necessário
//   })

//   it('renderiza o formulário de login e aceita entrada de usuário', async () => {
//     render(
//       <MemoryRouter initialEntries={['/login']}>
//         <SessionProvider>
//           <LoginPage />
//         </SessionProvider>
//       </MemoryRouter>
//     )
//     const emailInput = screen.getByLabelText(/email/i)
//     const passwordInput = screen.getByLabelText(/senha|password/i)
//     await userEvent.type(emailInput, 'test@example.com')
//     await userEvent.type(passwordInput, '123456')
//     await userEvent.click(screen.getByText(/entrar/i))
//     expect(emailInput).toHaveValue('test@example.com')
//     expect(passwordInput).toHaveValue('123456')
//   })
// })
