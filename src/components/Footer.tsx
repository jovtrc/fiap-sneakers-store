export function Footer() {
  return (
    <footer className="bg-background mt-8 border-t py-16">
      <div className="mx-auto max-w-5xl px-6">
        <a
          href="/"
          aria-label="ir para home"
          className="mx-auto mb-8 block size-fit text-2xl font-bold"
        >
          sneakers<span className="text-blue-600">_store</span>
        </a>

        <span className="text-caption block text-center text-sm">
          &copy; {new Date().getFullYear()} sneakers_store. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  )
}
