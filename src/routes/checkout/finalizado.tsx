import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { useCart } from '@/providers'

export const Route = createFileRoute('/checkout/finalizado')({
  component: RouteComponent,
})

function RouteComponent() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <Card className="overflow-hidden border-0 text-center shadow-lg">
        <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Pedido confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Obrigado pela sua compra. Aguardamos a sua retirada em nossa loja!
          </p>
          <div className="bg-muted rounded-lg p-6">
            <p className="text-muted-foreground text-sm">
              Caso tenha dúvidas, entre em contato com nossa equipe.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button
            asChild
            size="lg"
            className="from-primary to-primary/80 bg-gradient-to-r shadow-md"
          >
            <Link to="/perfil">Ir para os meus pedidos</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
