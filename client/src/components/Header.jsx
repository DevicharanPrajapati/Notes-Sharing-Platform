function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-gray-900">
          NoteSharing
        </h1>

        <nav className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Home
          </a>

          <a
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Register
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;