import { CatchNotFound, createFileRoute } from '@tanstack/react-router'

import { PageLoading, ProductDetails } from '@/components/ProductPage'
import { supabase } from '@/repositories'

export const Route = createFileRoute('/produtos/$slug')({
  component: RouteComponent,
  loader: async ({ params: { slug } }) => {
    const data = await loadProduct(slug)
    return { product: data }
  },
  pendingComponent: PageLoading,
})

async function loadProduct(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error loading product:', error)
    return null
  }

  return data
}

function RouteComponent() {
  const { product } = Route.useLoaderData()

  if (product === null) {
    return (
      <CatchNotFound>
        <p>caiu no 404</p>
      </CatchNotFound>
    )
  }

  return <ProductDetails product={product} />
}
