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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/repositories'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    })
    if (error) {
      toast.error('Erro no Login', {
        description: error.message,
        duration: 5000,
        descriptionClassName: '!text-muted-foreground',
      })
    }
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="from-primary/80 to-primary h-1 bg-gradient-to-r"></div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
              <Input
                id="email"
                placeholder="your@email.com"
                type="email"
                required
                name="email"
                onChange={handleInputChange}
                className="border-muted-foreground/20 focus-visible:ring-primary/50 pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <LockKeyhole className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
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
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Button
            type="submit"
            className="from-primary to-primary/80 w-full bg-gradient-to-r"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="border-primary-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
