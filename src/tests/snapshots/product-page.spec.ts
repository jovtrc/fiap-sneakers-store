import { expect, test } from '@playwright/test'

test.describe('snapshot da página de produto', () => {
  test('deve seguir o mesmo layout do snapshot', async ({ page }) => {
    await page.goto('/produtos/form-low')

    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot({
      maxDiffPixelRatio: 0.05,
    })
  })
})
