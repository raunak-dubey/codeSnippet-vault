export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64">Sidebar</aside>

      <main className="flex-1">
        <nav>Navbar</nav>
        {children}
      </main>
    </div>
  );
}
