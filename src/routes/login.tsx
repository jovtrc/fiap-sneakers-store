import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import Auth from '@/components/Auth/Auth'
import { useSession } from '@/providers/SessionProvider'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: '/login' })
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      navigate({
        to: '/perfil',
      })
    }
  })

  return (
    <div className="container mx-auto space-y-16 px-4 py-12">
      <Auth />
    </div>
  )
}
