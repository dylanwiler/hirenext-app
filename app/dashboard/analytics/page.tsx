'use client'
import { useState } from 'react'
import { TrendingUp, Users, Mic, DollarSign } from 'lucide-react'

const WEEKLY = [
  { day:'Mon', scanned:45, hire:12, maybe:10, reject:8 },
  { day:'Tue', scanned:68, hire:18, maybe:15, reject:17 },
  { day:'Wed', scanned:72, hire:20, maybe:18, reject:20 },
  { day:'Thu', scanned:35, hire:8, maybe:9, reject:8 },
  { day:'Fri', scanned:55, hire:15, maybe:12, reject:13 },
  { day:'Sat', scanned:20, hire:5, maybe:5, reject:5 },
  { day:'Sun', scanned:0, hire:0, maybe:0, reject:0 },
]

const STATS = [
  { label:'Candidates scanned', val:'553', delta:'+250 this cycle', color:'#F0EFEA', icon:Users },
  { label:'Hire-tier', val:'48', delta:'14.4% rate', color:'#1D9E75', icon:TrendingUp },
  { label:'AI interviews', val:'3', delta:'Avg 22min', color:'#F0EFEA', icon:Mic },
  { label:'Est. cost saved', val:'$2,400', delta:'vs recruiter fee', color:'#1D9E75', icon:DollarSign },
]

export default function AnalyticsPage() {
  const allVals = WEEKLY.map(w => w.scanned)
  const maxVal = allVals.reduce((a, b) => Math.max(a, b), 0) || 1
  return (
    <div className="page-enter">
      <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <h1 className="font-display font-extrabold text-xl" style={{ color:'#F0EFEA' }}>Analytics</h1>
      </div>
      <div className="px-7 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {STATS.map((s, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3"><span className="text-xs font-medium" style={{ color:'#8A8880' }}>{s.label}</span><s.icon size={14} style={{ color:'#4A4845' }} /></div>
              <div className="text-3xl font-bold mb-1" style={{ color:s.color }}>{s.val}</div>
              <div className="text-xs" style={{ color:'#3A3A3A' }}>{s.delta}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-5 mb-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-semibold mb-5" style={{ color:'#F0EFEA' }}>Candidates scanned this week</h3>
          <div className="flex items-end gap-2 h-32">
            {WEEKLY.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg transition-all" style={{ height:`${Math.max(2,(w.scanned/maxVal)*100)}%`, background:'#1D9E75', opacity:w.scanned>0?1:0.2 }} />
                <span className="text-xs" style={{ color:'#4A4845' }}>{w.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl p-5" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color:'#F0EFEA' }}>Pipeline breakdown</h3>
            {[['Hire',48,'#1D9E75'],['Maybe',202,'#BA7517'],['Reject',303,'#E24B4A']].map(([l,v,c]) => (
              <div key={String(l)} className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1"><span style={{ color:'#8A8880' }}>{l}</span><span className="font-bold" style={{ color:String(c) }}>{v}</span></div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}><div className="h-full rounded-full" style={{ width:`${(Number(v)/553)*100}%`, background:String(c) }} /></div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-5 col-span-2" style={{ background:'#111111', border:'1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color:'#F0EFEA' }}>Cost analysis</h3>
            <div className="grid grid-cols-3 gap-3">
              {[{ l:'Per recruiter', v:'$4,000', sub:'Typical fee', high:false },{ l:'Hire Next AI', v:'$600', sub:'Scale plan', high:false },{ l:'You saved', v:'$3,400', sub:'12 hires in', high:true }].map((s,i) => (
                <div key={i} className="rounded-xl p-4" style={{ background:s.high?'rgba(29,158,117,0.08)':'#161616', border:s.high?'1px solid rgba(29,158,117,0.2)':'1px solid rgba(255,255,255,0.05)' }}>
                  <div className="text-xs mb-1" style={{ color:'#8A8880' }}>{s.l}</div>
                  <div className="text-xl font-bold mb-0.5" style={{ color:s.high?'#1D9E75':'#F0EFEA' }}>{s.v}</div>
                  <div className="text-xs" style={{ color:'#3A3A3A' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
