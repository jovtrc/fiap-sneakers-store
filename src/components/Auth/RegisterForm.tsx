import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/repositories'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const { error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
    })
    if (error) {
      toast.error('Erro ao Criar Conta', {
        description: error.message,
        duration: 5000,
        descriptionClassName: '!text-muted-foreground',
      })
    }
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(e.target.name)
    console.log(formValues)
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
              <Input
                id="email-signup"
                placeholder="your@email.com"
                type="email"
                required
                name="email"
                data-testid="register-email-input"
                onChange={handleInputChange}
                className="border-muted-foreground/20 focus-visible:ring-primary/50 pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <div className="relative">
              <LockKeyhole className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
              <Input
                id="password-signup"
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                data-testid="register-password-input"
                onChange={handleInputChange}
                className="border-muted-foreground/20 focus-visible:ring-primary/50 pl-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 aspect-square h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-5 w-5" />
                ) : (
                  <Eye className="text-muted-foreground h-5 w-5" />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">
              Password must be at least 8 characters long
            </p>
          </div>
          <p className="text-muted-foreground text-xs">
            Ao cadastrar-se você concorda com os termos de uso deste site.
          </p>
          <Button
            type="submit"
            data-testid="register-submit-button"
            className="from-primary to-primary/80 w-full bg-gradient-to-r"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
