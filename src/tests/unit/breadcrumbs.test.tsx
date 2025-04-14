import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumbs } from '@/components/Breadcrumbs'

const breadcrumbsMock = [
  { title: 'Home', href: '/' },
  { title: 'Produtos', href: '#' },
  { title: 'Sneakers', href: '#' },
  { title: 'Forum Low', href: '' },
]

describe('Breadcrumbs', () => {
  it('deve renderizar quatro breadcrumb-items', () => {
    render(<Breadcrumbs items={breadcrumbsMock} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Produtos')).toBeInTheDocument()
    expect(screen.getByText('Sneakers')).toBeInTheDocument()
    expect(screen.getByText('Forum Low')).toBeInTheDocument()

    expect(screen.getAllByTestId('breadcrumb-item')).toHaveLength(
      breadcrumbsMock.length
    )

    expect(screen.getAllByTestId('breadcrumb-link')).toHaveLength(
      breadcrumbsMock.length - 1
    )
  })
})
