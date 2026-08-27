import { useAuth } from '../hooks/useAuth'
import { AdminLogin } from './AdminLogin'
import { AdminDashboard } from './AdminDashboard'

export function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--bg)',
        }}
      >
        <div style={{ width: 280, display: 'grid', gap: 12 }}>
          <div className="skeleton" style={{ height: 20, width: '60%' }} />
          <div className="skeleton" style={{ height: 160 }} />
          <div className="skeleton" style={{ height: 48 }} />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
