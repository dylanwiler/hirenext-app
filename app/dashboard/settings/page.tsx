'use client'
import { useState } from 'react'
import { Settings, Check, Bell, Zap } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <h1 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>Settings</h1>
          <p className="text-sm mt-0.5" style={{ color:'s#4A4845' }}>Manage your account, platforms, and billing</p>
        </div>
      </div>
      <div className="px-7 py-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          {/* VAPI Status */}
          <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold" style={{ color:'s#F0EFEA' }}>VAPI Interview Line</h3><div className="flex items-center gap-1.5" style={{ color:'s#1D9E75' }}><span className="dot-live inline-block w-1.5 h-1.5" /><span className="text-xs font-medium">Active</span></div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs mb-1" style={{ color:'#8A8880' }}>Phone number</p><p className="text-base font-semibold" style={{ color:'s#F0EFEA' }}>+1 (562) 745 6631</p></div>
              <div><p className="text-xs mb-1" style={{ color:'#8A8880' }}>AI model</p><p className="text-base font-semibold" style={{ color:'s#F0EFEA' }}>Claude Sonnet</p></div>
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold" style={{ color:'s#F0EFEA' }}>ZipRecruiter</h3><div className="flex items-center gap-1.5" style={{ color:'#1D9E75' }}><Check size={12} /><span className="text-xs font-medium">Connected</span></div></div>
            <p className="text-sm" style={{ color:'#8A8880' }}>hello@mindscript.app · 553 candidates synced</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-4"><Bell size={16} style={{ color:'#8A8880' }} /><h3 className="text-sm font-semibold" style={{ color:'#F0EFEA' }}>Notifications</h3></div>
            {[{ label:'Hire-tier candidate found', active:true },{ label:'Candidate replied', active:true },{ label:'Interview completed', active:true }].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom:i<2?'1px solid rgba(255,255,255,0.04)':'none' }}>
                <p className="text-sm font-medium" style={{ color:'#F0EFEA' }}>{n.label}</p>
                <div className="w-11 h-6 rounded-full cursor-pointer relative transition-all" style={{ background:'#1D9E75' }} onClick={()=>toast.success('Preference saved')}><div className="w-4 h-4 rounded-full absolute top-1" style={{ background:'#fff', left:'24px', transition:"left 0.1s" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl p-5" style={{ background:'rgba(29,158,117,0.06)', border:'1px solid rgba(29,158,117,0.25)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color:'#1D9E75' }}>Billing</h3>
            <p className="text-sm mb-3" style={{ color:'#8A8880' }}>Manage your subscription and payment methods</p>
            <Link href="/dashboard/settings/billing" className="btn-primary text-sm inline-flex">View billing &amp; plans →</Link>
          </div>
          <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color:'#F0EFEA' }}>Danger zone</h3>
            <button onClick={()=>toast.error('Contact support to delete your account')} className="text-xs px-4 py-2 rounded-xl transition-all" style={{ background:'rgba(226,75,74,0.1)', border:'1px solid rgba(226,75,74,0.3)', color:'#E24B4A' }}>Delete account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
