import { AuthGuard } from '@/features/auth/guards/AuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <main className="flex min-h-screen">{children}</main>
    </AuthGuard>
  );
}
