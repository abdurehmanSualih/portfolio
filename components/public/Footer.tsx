export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-surface py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {year}{" "}
          <span className="text-gray-400">Abdurehman Sualih</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
