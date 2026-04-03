import DashboardSidebar from '@/components/dashboard/Sidebar'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')
  const user = session.user
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0A0A' }}>
      <DashboardSidebar user={user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}