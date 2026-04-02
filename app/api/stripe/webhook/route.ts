import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase-server'
import { sendPaymentSuccessEmail } from '@/lib/emails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_email || ''
    const planId = session.metadata?.planId || 'unknown'
    const amount = session.amount_total || 0
    const admin = createAdminClient()
    const { data: usersData } = await admin.auth.admin.listUsers()
    const user = usersData?.users.find((u: { email?: string }) => u.email === email)
    if (user) {
      await admin.auth.admin.updateUserById(user.id, {
        user_metadata: { plan: planId, plan_active: true, stripe_session_id: session.id }
      })
      await sendPaymentSuccessEmail(email, user.user_metadata?.first_name || '', planId, amount)
    }
  }
  return NextResponse.json({ received: true })
}