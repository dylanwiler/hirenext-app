import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import DashboardSidebar from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/auth/login')
  }
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0A0A' }}>
      <DashboardSidebar user={session.user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}