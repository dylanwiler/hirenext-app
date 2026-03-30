import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import DashboardSidebar from '@/components/dashboard/Sidebar'
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#090909' }}>
      <DashboardSidebar user={user} />
      <main className="flex-1 flex flex-col overflow-hidden"><div className="flex-1 overflow-y-auto">{children}</div></main>
    </div>
  )
}