import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, type PlanId } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase'
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { planId } = await req.json() as { planId: PlanId }
    const plan = PLANS[planId]
    if (!plan) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.hirenext.app'
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email, client_reference_id: user.id,
      payment_method_types: ['card'], mode: 'subscription',
      line_items: [{ price: plan.priceId, quantity: 1 }],
      subscription_data: { metadata: { user_id: user.id, plan_id: planId }, trial_period_days: 14 },
      metadata: { user_id: user.id, plan_id: planId },
      success_url: `${appUrl}/dashboard?payment=success&plan=${planId}`,
      cancel_url: `${appUrl}/dashboard/settings/billing?payment=cancelled`,
      allow_promotion_codes: true,
    })
    return NextResponse.json({ url: session.url })
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}