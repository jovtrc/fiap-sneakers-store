import test, { expect } from '@playwright/test'

test('fazendo login e visualizando pedidos', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Minha Conta' }).click()

  await page.waitForTimeout(500)

  await page.getByTestId('login-email-input').fill('aula-postech@exemplo.com')

  await page.getByTestId('login-password-input').fill('senhaforte123@')

  await page.getByTestId('login-submit-button').click()

  await page.waitForTimeout(1500)

  await expect(page.getByText('Últimos Pedidos')).toBeVisible()

  const orders = await page.getByTestId('order-details-card').all()

  await expect(orders.length).toBeGreaterThanOrEqual(1)
})
