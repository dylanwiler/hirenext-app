import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

// VAPI calls this webhook when interview events happen
export async function POST(request: NextRequest) {
  const payload = await request.json()
  const supabase = createAdminClient()

  const { message } = payload
  if (!message) return NextResponse.json({ ok: true })

  const type = message.type
  const call = message.call

  if (type === 'end-of-call-report') {
    const callId = call?.id
    const endedReason = message.endedReason
    const duration = call?.endedAt && call?.startedAt
      ? Math.round((new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000)
      : null

    // Extract candidate info from call metadata
    const metadata = call?.metadata || {}
    const candidateName = metadata.candidate_name || 'Unknown'
    const candidateEmail = metadata.candidate_email || ''
    const jobTitle = metadata.job_title || ''
    const userId = metadata.user_id || ''

    // Build AI summary from transcript
    const transcript = message.transcript || null
    const summary = message.summary || null
    const recordingUrl = call?.recordingUrl || null

    // Score from structured data
    const analysisScore = message.analysis?.structuredData?.score || null

    // Upsert interview record
    await supabase.from('interviews').upsert({
      vapi_call_id: callId,
      user_id: userId,
      candidate_name: candidateName,
      candidate_email: candidateEmail,
      job_title: jobTitle,
      status: endedReason === 'customer-ended-call' || endedReason === 'assistant-ended-call' ? 'completed' : 'no_answer',
      duration_seconds: duration,
      recording_url: recordingUrl,
      transcript: transcript,
      summary: summary,
      score: analysisScore,
      call_ended_at: call?.endedAt || new Date().toISOString(),
    }, { onConflict: 'vapi_call_id' })
  }

  return NextResponse.json({ ok: true })
}