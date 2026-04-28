import ThemeToggle from "@/components/ui/ThemeToggle";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 right-0 z-50 p-4">
        <ThemeToggle />
      </header>
      <main>{children}</main>
    </>
  );
}
