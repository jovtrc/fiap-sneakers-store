import ActionIcons from './Components/ActionIcons'
import Menu from './Components/Menu'
import MobileMenu from './Components/MobileMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="bg-background/70 absolute inset-0 -z-10 backdrop-blur-sm"></div>
      <div className="container mx-auto flex h-16 items-center px-4">
        <MobileMenu />

        <a
          href="/"
          className="flex items-center text-xl font-bold lowercase md:w-52"
        >
          sneakers<span className="text-blue-600">_store</span>
        </a>

        <Menu />

        <div className="ml-auto flex items-center justify-end gap-2 md:ml-0 md:w-52">
          <ActionIcons />
        </div>
      </div>
    </header>
  )
}
