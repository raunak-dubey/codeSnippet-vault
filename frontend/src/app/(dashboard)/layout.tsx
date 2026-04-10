import { AuthGuard } from '@/features/auth/guards/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <aside className="w-64">Sidebar</aside>

        <main className="flex-1">
          <nav>Navbar</nav>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
