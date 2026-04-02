import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICE_IDS: Record<string, string> = {
  solo: process.env.STRIPE_PRICE_SOLO || 'price_1TGVkH1lvYSC7itfl4Wl7lHT',
  growth: process.env.STRIPE_PRICE_GROWTH || 'price_1TGVjn1lvYSC7itfXmmXnORK',
  scale: process.env.STRIPE_PRICE_SCALE || 'price_1TGVjF1lvYSC7itfJcKBjlg4',
}

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json()
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const priceId = PRICE_IDS[planId]
    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing`,
      customer_email: user.email,
      metadata: { planId, userId: user.id },
    })
    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}