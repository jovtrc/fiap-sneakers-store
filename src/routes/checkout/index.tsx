import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ChevronLeft,
  CreditCardIcon as CardIcon,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Auth from '@/components/Auth/Auth'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
} from '@/components/ui'
import { transformNumberToBrl } from '@/lib/formatter'
import { useCart } from '@/providers'
import { useSession } from '@/providers/SessionProvider'
import { supabase } from '@/repositories'
import { TProduct } from '@/types/product.types'

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
})

function CheckoutPage() {
  const navigate = useNavigate({ from: '/checkout' })

  const { session } = useSession()
  const { cartItems, subtotal } = useCart()

  const [activeStep, setActiveStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippingApartment, setShippingApartment] = useState('')
  const [shippingCity, setShippingCity] = useState('')
  const [shippingState, setShippingState] = useState('')
  const [shippingZip, setShippingZip] = useState('')

  useEffect(() => {
    if (session) {
      setActiveStep(2)
    }
  }, [session])

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate({
        to: '/',
      })
    }
  }, [cartItems, navigate])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const productsIds = cartItems.map((item) => item.id)

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          shipping_price: 0,
          order_price: subtotal,
          delivery_method: 'Retirada',
          payment_method: 'Pagar na Retirada',
          items_ids: productsIds,
          products_list: cartItems,
        },
      ])
      .select()

    if (error) {
      toast.error('Erro ao criar pedido', {
        description: error.message,
        duration: 5000,
        descriptionClassName: '!text-muted-foreground',
      })
    }

    navigate({
      to: '/checkout/finalizado',
    })
  }

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/carrinho">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </div>

      {/* Checkout Progress */}
      <div className="mb-10">
        <div className="relative">
          <div className="bg-muted absolute top-1/2 left-0 h-1 w-full -translate-y-1/2"></div>
          <div
            className="from-primary to-primary/70 absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r transition-all duration-300"
            style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
          ></div>
          <div className="relative flex justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}
              >
                1
              </div>
              <span className="mt-2 text-sm font-medium">Information</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}
              >
                2
              </div>
              <span className="mt-2 text-sm font-medium">Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}
              >
                3
              </div>
              <span className="mt-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

          {/* <form onSubmit={handleSubmit}> */}
          <div>
            <div className="space-y-8">
              {/* Step 1: Contact Information */}
              {activeStep === 1 && <Auth />}

              {/* Step 2: Shipping Address */}
              {activeStep === 2 && (
                <div className="animate-in fade-in space-y-8 duration-300">
                  <Card className="overflow-hidden border-0 shadow-md">
                    <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs">
                          2
                        </div>
                        Endereço
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço e Bairro</Label>
                        <Input
                          id="address"
                          name="address"
                          required
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          className="border-muted-foreground/20 focus-visible:ring-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apartment">
                          Complemento (opcional)
                        </Label>
                        <Input
                          id="apartment"
                          name="apartment"
                          value={shippingApartment}
                          onChange={(e) => setShippingApartment(e.target.value)}
                          className="border-muted-foreground/20 focus-visible:ring-primary/50"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            name="city"
                            required
                            value={shippingCity}
                            onChange={(e) => setShippingCity(e.target.value)}
                            className="border-muted-foreground/20 focus-visible:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            name="state"
                            required
                            value={shippingState}
                            onChange={(e) => setShippingState(e.target.value)}
                            className="border-muted-foreground/20 focus-visible:ring-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">CEP</Label>
                          <Input
                            id="zip"
                            name="zip"
                            required
                            value={shippingZip}
                            onChange={(e) => setShippingZip(e.target.value)}
                            className="border-muted-foreground/20 focus-visible:ring-primary/50"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="mb-4 text-lg font-medium">
                          Método de Entrega
                        </h3>
                        <p>
                          Não encontramos métodos de entrega no momento, mas
                          você pode retirar o seu pedido em nossa loja!
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="from-primary to-primary/80 bg-gradient-to-r shadow-sm"
                      >
                        Continuar para pagamento
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {activeStep === 3 && (
                <div className="animate-in fade-in space-y-8 duration-300">
                  <Card className="overflow-hidden border-0 shadow-md">
                    <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs">
                          3
                        </div>
                        Método de Pagamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="mt-6 rounded-lg border bg-white p-6">
                        <div className="flex flex-col space-y-4">
                          <div className="bg-muted rounded-lg p-4">
                            <h3 className="mb-2 font-medium">
                              Pagar na retirada
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Pague da forma que achar melhor na retirada do seu
                              pedido.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                              <ShieldCheck className="text-primary h-5 w-5" />
                            </div>
                            <div className="text-sm">
                              <p className="font-medium">
                                Seguro e conveniente
                              </p>
                              <p className="text-muted-foreground">
                                Não é preciso compartilhar dados de pagamento
                                online
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                              <CardIcon className="text-primary h-5 w-5" />
                            </div>
                            <div className="text-sm">
                              <p className="font-medium">
                                Pague após ver seu Sneaker
                              </p>
                              <p className="text-muted-foreground">
                                Inspecione o Sneaker antes de fazer o pagamento
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="from-primary to-primary/80 bg-gradient-to-r shadow-md"
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                            Processando...
                          </div>
                        ) : (
                          'Finalizar pedido'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}

              <div className="lg:hidden">
                <OrderSummary cartItems={cartItems} subtotal={subtotal} />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <OrderSummary cartItems={cartItems} subtotal={subtotal} />
        </div>
      </div>
    </div>
  )
}

function OrderSummary({
  cartItems,
  subtotal,
}: {
  cartItems: TProduct[]
  subtotal: number
}) {
  return (
    <div className="sticky top-20">
      <Card className="overflow-hidden border-0 shadow-md">
        <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-3"
              >
                <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.images[0] || ''}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-muted-foreground text-xs">
                      Qty: {item.quantity || 1} {item.selectedColor} •{' '}
                      {item.selectedSize}
                    </p>
                    <p className="font-medium">
                      {transformNumberToBrl(item.price * (item.quantity || 1))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{transformNumberToBrl(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{transformNumberToBrl(subtotal)}</span>
            </div>
          </div>
          <div className="pt-4">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure checkout</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
