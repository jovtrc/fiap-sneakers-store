import test, { expect } from '@playwright/test'

test('comprando um produto', async ({ page }) => {
  await page.goto('/')

  await page.waitForTimeout(2000)

  await page.getByRole('link', { name: 'Air Jordan 1 High OG Adidas' }).click()

  await page.waitForTimeout(2000)

  await page.getByRole('button', { name: '38' }).click()
  await page.getByRole('button', { name: 'Magenta' }).click()
  await page.getByTestId('add-to-cart-button').click()

  await page.waitForTimeout(500)

  await expect(page.getByText('Adicionado ao carrinho!')).toBeVisible()

  await page.getByRole('button', { name: '1 Carrinho' }).click()

  await expect(page.getByTestId('cart-total-price')).toContainText(
    'R$ 1.699,00'
  )

  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click()

  await expect(page.getByTestId('product-quantity')).toContainText('2')

  await page.getByRole('link', { name: 'Finalizar compra' }).click()
  await page.waitForTimeout(500)

  await page.getByTestId('login-email-input').fill('aula-postech@exemplo.com')

  await page.getByTestId('login-password-input').fill('senhaforte123@')

  await page.getByTestId('login-submit-button').click()

  await page.waitForTimeout(1500)

  await page
    .getByRole('textbox', { name: 'Endereço e Bairro' })
    .fill('Endereço teste')

  await page
    .getByRole('textbox', { name: 'Complemento (opcional)' })
    .fill('Complemento teste')

  await page.getByRole('textbox', { name: 'Cidade' }).fill('Cidade teste')

  await page.getByRole('textbox', { name: 'Estado' }).fill('Estado teste')

  await page.getByRole('textbox', { name: 'CEP' }).fill('01234-567')

  await page.getByRole('button', { name: 'Continuar para pagamento' }).click()

  await page.getByRole('button', { name: 'Finalizar pedido' }).click()

  await page.waitForTimeout(1500)

  await expect(page.getByText('Pedido confirmado!')).toBeVisible()
})
