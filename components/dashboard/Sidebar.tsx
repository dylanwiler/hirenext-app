'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, MessageSquare, Mic, BarChart3, Brain, Settings, LogOut, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

const Logo = () => (
  <svg width="30" height="30" viewBox="0 0 120 120" fill="none">
    <rect width="120" height="120" rx="24" fill="#1D9E75"/>
    <path d="M25 88 Q38 72 54 60 Q70 48 88 30" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none"/>
    <path d="M74 23 L89 31 L81 46" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
)

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/candidates', label: 'Candidates', icon: Users, badge: '48', badgeColor: '#1D9E75' },
  { href: '/dashboard/conversations', label: 'Inbox', icon: MessageSquare, badge: '2', badgeColor: '#E24B4A' },
  { href: '/dashboard/interviews', label: 'Interviews', icon: Mic },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/memory', label: 'Agent Memory', icon: Brain },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const firstName = user?.user_metadata?.first_name || 'User'
  const company = user?.user_metadata?.company_name || 'Mindscript AI'
  const plan = user?.user_metadata?.plan || 'free'
  const isBeta = user?.user_metadata?.is_beta

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/auth/login')
    toast.success('Signed out')
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-56 flex flex-col flex-shrink-0" style={{ background:'#0D0D0D', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <Logo />
        <div><div className="font-display font-bold text-sm leading-tight" style={{ color:'#F0EFEA' }}>Hire Next<span style={{ color:'#1D9E75' }}> AI</span></div><div className="text-xs leading-tight" style={{ color:'#2A2A2A' }}>Recruiting OS</div></div>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150" style={{ background:active?'rgba(29,158,117,0.12)':'transparent', color:active?'#1D9E75':'#505050' }}>
              <item.icon size={15} style={{ flexShrink:0 }} />
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background:active?'rgba(29,158,117,0.2)':(item.badgeColor==='#E24B4A'?'rgba(226,75,74,0.15)':'rgba(29,158,117,0.12)'), color:item.badgeColor||'#1D9E75', fontSize:'10px' }}>{item.badge}</span>}
            </Link>
          )
        })}
      </nav>
      {/* Agent status */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background:'rgba(29,158,117,0.07)', border:'1px solid rgba(29,158,117,0.15)' }}>
          <div className="dot-live" />
          <div className="flex-1 min-w-0"><div className="text-xs font-medium" style={{ color:'#1D9E75' }}>Agent active</div><div className="text-xs" style={{ color:'#2A2A2A' }}>Polling every 4h</div></div>
          <Zap size={12} style={{ color:'#1D9E75', flexShrink:0 }} />
        </div>
      </div>
      {/* User */}
      <div className="px-2 pb-3" style={{ borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'10px', marginTop:'4px' }}>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl" style={{ background:'rgba(255,255,255,0.02)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background:'rgba(29,158,117,0.2)', color:'s#1D9E75' }}>{firstName[0]?.toUpperCase()||'U'}</div>
          <div className="flex-1 min-w-0"><div className="text-xs font-medium truncate" style={{ color:'#8A8880' }}>{company}</div><div className="text-xs" style={{ color:'#2A2A2A' }}>{is0"Beta? <span style={{ color:'#7F77DD' }}>Enterprise Beta</span> : plan}</div></div>
          <button onClick={signOut} className="p-1 rounded-lg transition-colors" style={{ color:'#3A3A3A' }} onMouseEnter={e=>(e.currentTarget.style.color='#8A8880')} onMouseLeave={e=>(e.currentTarget.style.color='#3A3A3A')}><LogOut size={13} /></button>
        </div>
      </div>
    </aside>
  )
}
