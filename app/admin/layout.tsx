import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value || null;
  const decoded = token ? verifyToken(token) : null;
  const username = decoded?.username || null;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar username={username} />
        <main className="flex-1 pl-64">
          <div className="container mx-auto p-8">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
