import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui'
import { useTheme } from '@/providers'
export function ThemeToggler() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    switch (theme) {
      case 'dark':
        setTheme('light')
        break
      case 'light':
        setTheme('dark')
        break
      default:
        setTheme('dark')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
