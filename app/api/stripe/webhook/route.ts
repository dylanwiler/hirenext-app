import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase'
import { sendWelcomeEmail, sendPaymentSuccessEmail } from '@/lib/emails'
import type Stripe from 'stripe'
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event: Stripe.Event
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!) }
  catch (err: any) { return NextResponse.json({ error: 'Invalid signature' }, { status: 400 }) }
  const supabase = createAdminClient()
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession
    const userId = session.metadata?.user_id
    const planId = session.metadata?.plan_id
    if (userId && planId) {
      const { data: { user } } = await supabase.auth.admin.getUserById(userId)
      if (user) {
        await supabase.auth.admin.updateUserById(userId, { user_metadata: { ...user.user_metadata, plan: planId, plan_active: true, stripe_customer_id: session.customer } })
        if (user.email) {
          await sendWelcomeEmail(user.email, user.user_metadata?.first_name||'there', user.user_metadata?.company_name||'your company')
          await sendPaymentSuccessEmail(user.email, user.user_metadata?.first_name||'there', planId, session.amount_total||0)
        }
      }
    }
  }
  return NextResponse.json({ received: true })
}