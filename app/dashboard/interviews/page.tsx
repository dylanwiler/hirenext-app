'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Mic, Phone, Play, Clock, ChevronRight, User, Star } from 'lucide-react'

interface Interview {
  id: string
  candidate_name: string
  candidate_email: string
  job_title: string
  status: 'scheduled' | 'completed' | 'no_answer' | 'cancelled'
  score: number | null
  duration_seconds: number | null
  recording_url: string | null
  summary: string | null
  transcript: string | null
  created_at: string
  call_ended_at: string | null
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [selected, setSelected] = useState<Interview | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setInterviews(data)
        if (data.length > 0) setSelected(data[0])
      }
      setLoading(false)
    }
    load()
  }, [])

  function formatDuration(seconds: number | null) {
    if (!seconds) return '--'
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  function statusColor(status: string) {
    if (status === 'completed') return '#1D9E75'
    if (status === 'scheduled') return '#6366F1'
    if (status === 'no_answer') return '#F59E0B'
    return '#4A4845'
  }

  function statusLabel(status: string) {
    if (status === 'completed') return 'Completed'
    if (status === 'scheduled') return 'Scheduled'
    if (status === 'no_answer') return 'No Answer'
    return 'Cancelled'
  }

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: '#1D9E75', borderTopColor: 'transparent' }} />
    </div>
  )

  return (
    <div className="page-enter flex h-full">
      {/* Left panel — interview list */}
      <div className="w-72 flex-shrink-0 border-r flex flex-col" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h1 className="font-display font-extrabold text-lg" style={{ color: '#F0EFEA' }}>Interviews</h1>
          <p className="text-xs mt-0.5" style={{ color: '#4A4845' }}>{interviews.length} total</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {interviews.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(29,158,117,0.1)' }}>
                <Mic size={18} style={{ color: '#1D9E75' }} />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#F0EFEA' }}>No interviews yet</p>
              <p className="text-xs" style={{ color: '#4A4845' }}>Interviews appear here after AI calls your shortlisted candidates</p>
            </div>
          ) : interviews.map(i => (
            <button
              key={i.id}
              onClick={() => setSelected(i)}
              className="w-full text-left px-5 py-4 transition-all"
              style={{
                background: selected?.id === i.id ? 'rgba(29,158,117,0.08)' : 'transparent',
                borderLeft: selected?.id === i.id ? '2px solid #1D9E75' : '2px solid transparent'
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm" style={{ color: '#F0EFEA' }}>{i.candidate_name}</span>
                <ChevronRight size={12} style={{ color: '#4A4845' }} />
              </div>
              <p className="text-xs mb-2" style={{ color: '#4A4845' }}>{i.job_title}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${statusColor(i.status)}18`, color: statusColor(i.status) }}>
                  {statusLabel(i.status)}
                </span>
                {i.score && <span className="text-xs font-bold" style={{ color: '#1D9E75' }}>{i.score}/10</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel — interview detail */}
      <div className="flex-1 overflow-y-auto">
        {!selected ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm" style={{ color: '#4A4845' }}>Select an interview to view details</p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(29,158,117,0.12)' }}>
                  <User size={18} style={{ color: '#1D9E75' }} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg" style={{ color: '#F0EFEA' }}>{selected.candidate_name}</h2>
                  <p className="text-sm" style={{ color: '#4A4845' }}>{selected.job_title} · {selected.candidate_email}</p>
                </div>
              </div>
              {selected.score && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.2)' }}>
                  <Star size={13} style={{ color: '#1D9E75' }} />
                  <span className="font-bold text-sm" style={{ color: '#1D9E75' }}>{selected.score}/10</span>
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Status', value: statusLabel(selected.status), icon: Phone },
                { label: 'Duration', value: formatDuration(selected.duration_seconds), icon: Clock },
                { label: 'Date', value: new Date(selected.created_at).toLocaleDateString(), icon: Mic },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="card p-4">
                  <Icon size={14} className="mb-2" style={{ color: '#4A4845' }} />
                  <p className="text-xs mb-0.5" style={{ color: '#4A4845' }}>{label}</p>
                  <p className="font-medium text-sm" style={{ color: '#F0EFEA' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Recording */}
            {selected.recording_url ? (
              <div className="card p-4">
                <p className="text-xs font-semibold mb-3" style={{ color: '#8A8880' }}>RECORDING</p>
                <audio controls className="w-full" style={{ height: '36px' }}>
                  <source src={selected.recording_url} type="audio/mpeg" />
                </audio>
              </div>
            ) : selected.status === 'completed' && (
              <div className="card p-4">
                <p className="text-xs font-semibold mb-2" style={{ color: '#8A8880' }}>RECORDING</p>
                <p className="text-sm" style={{ color: '#4A4845' }}>Recording processing — check back shortly</p>
              </div>
            )}

            {/* AI Summary */}
            {selected.summary ? (
              <div className="card p-4">
                <p className="text-xs font-semibold mb-3" style={{ color: '#8A8880' }}>AI SUMMARY</p>
                <p className="text-sm leading-relaxed" style={{ color: '#C0BEBB' }}>{selected.summary}</p>
              </div>
            ) : selected.status === 'completed' && (
              <div className="card p-4">
                <p className="text-xs font-semibold mb-2" style={{ color: '#8A8880' }}>AI SUMMARY</p>
                <p className="text-sm" style={{ color: '#4A4845' }}>Summary generating — usually ready within 2 minutes of call completion</p>
              </div>
            )}

            {/* Transcript */}
            {selected.transcript && (
              <div className="card p-4">
                <p className="text-xs font-semibold mb-3" style={{ color: '#8A8880' }}>TRANSCRIPT</p>
                <div className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: '#4A4845', maxHeight: '300px', overflowY: 'auto' }}>
                  {selected.transcript}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}