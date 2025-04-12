import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Auth() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
