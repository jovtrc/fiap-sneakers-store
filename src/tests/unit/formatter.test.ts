import { describe, expect, it } from 'vitest'

import { transformNumberToBrl } from '@/lib/formatter'

describe('Formatador de strings', () => {
  it('deve formatar um número para Reais (R$)', () => {
    const number = 236.59

    const formattedNumber = transformNumberToBrl(number)

    expect(formattedNumber).toBe('R$ 236,59')
  })
})
