function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} NoteSharing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;