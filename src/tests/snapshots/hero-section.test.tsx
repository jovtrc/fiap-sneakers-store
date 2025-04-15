import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeroSection } from '@/components/HeroSection'

describe('snaptshots do componente hero-section', () => {
  it('deve ser igual ao snapshot', () => {
    const { container } = render(<HeroSection />)

    expect(container).toMatchSnapshot()
  })
})
