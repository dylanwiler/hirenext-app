import Link from 'next/link'
const Logo = () => (<svg width="28" height="28" viewBox="0 0 120 120" fill="none"><rect width="120" height="120" rx="24" fill="#1D9E75"/><path d="M25 88 Q38 72 54 60 Q70 48 88 30" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none"/><path d="M74 23 L89 31 L81 46" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>)
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#090909' }}>
      <div className="absolute inset-0 pointer-events-none"><div style={{ position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:'800px',height:'500px',background:'radial-gradient(ellipse at top, rgba(29,158,117,0.08) 0%, transparent 70%)' }} /></div>
      <nav className="relative flex items-center px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5"><Logo /><span className="font-display font-bold text-base" style={{ color:'#F0EFEA' }}>Hire Next<span style={{ color:'#1D9E75' }}> AI</span></span></Link>
      </nav>
      <div className="relative flex-1 flex items-center justify-center px-4 py-12">{children}</div>
    </div>
  )
}