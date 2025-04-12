import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LogOut, Package } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { transformNumberToBrl } from '@/lib/formatter'
import { useSession } from '@/providers/SessionProvider'
import { supabase } from '@/repositories'
import { Tables } from '@/types/database.types'
import { TProduct } from '@/types/product.types'

export const Route = createFileRoute('/perfil')({
  component: RouteComponent,
})

export function RouteComponent() {
  const navigate = useNavigate({ from: '/perfil' })
  const { session } = useSession()

  const [orders, setOrders] = useState<Tables<'orders'>[]>([])

  useEffect(() => {
    if (!session) {
      navigate({
        to: '/login',
      })
    }

    async function fetchData() {
      // Consulta os pedidos do usuário atual
      const { data, error } = await supabase
        .from('orders')
        .select('*') // Você pode especificar as colunas que quer retornar em vez de '*'
        .eq('user', session?.user.id ?? '')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar pedidos:', error)
        return []
      }

      setOrders(data)
    }

    fetchData()
  }, [navigate, session])

  const handleLogout = () => {
    supabase.auth.signOut()
  }

  const formatDate = (date: string | Date) => {
    date = new Date(date)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <div className="w-full space-y-6 md:w-64">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-xl font-bold">Bem vindo</h2>
                <p className="text-muted-foreground text-sm">
                  {session?.user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Orders Tab */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
            <CardHeader>
              <CardTitle>Últimos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="overflow-hidden rounded-lg border"
                  >
                    <div className="bg-muted/50 flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Pedido #{order.id}</h3>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Feito em {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">
                          {transformNumberToBrl(order.order_price)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          Retirada na loja
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {order.products_list.map((item: TProduct) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3"
                          >
                            <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={item.images[0] || '/placeholder.svg'}
                                alt={item.name}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-muted-foreground text-xs">
                                Qtd.: {item.quantity}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Cor: {item.selectedColor}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Tamanho: {item.selectedSize}
                              </p>
                              <p className="text-sm">
                                {transformNumberToBrl(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
