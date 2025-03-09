export function Footer() {
  return (
    <footer className="bg-background mt-8 border-t py-16">
      <div className="mx-auto max-w-5xl px-6">
        <a
          href="/"
          aria-label="ir para home"
          className="mx-auto block size-fit text-2xl font-bold"
        >
          SneakersHub
        </a>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" className="hover:text-muted-foreground">
            <span>Features</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <span>Solution</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <span>Customers</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <span>Pricing</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <span>Help</span>
          </a>
          <a href="#" className="hover:text-muted-foreground">
            <span>About</span>
          </a>
        </div>
        <span className="text-caption block text-center text-sm">
          &copy; {new Date().getFullYear()} SneakersHub. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  )
}
