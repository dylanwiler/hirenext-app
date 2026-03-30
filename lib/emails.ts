import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = process.env.RESEND_FROM_EMAIL || 'hello@hirenext.app'

export async function sendWelcomeEmail(email: string, firstName: string, companyName: string) {
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: `Welcome to Hire Next AI, ${firstName}!`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0auto"><h2>Welcome to Hire Next AI</h2><p>Hey ${firstName},</p><p>Your account for ${companyName} is live. Your AI recruiting agent is ready to start screening candidates.</p><a href="https://app.hirenext.app/dashboard" style="background:#1D9E75;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">Open dashboard</a></div>`
    })
  } catch (e) { console.error('Welcome email error:', e) }
}

export async function sendPaymentSuccessEmail(email: string, firstName: string, planId: string, amount: number) {
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: `Payment confirmed — You're on the ${planId} plan`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0auto"><h2>Payment Confirmed</h2><p>Hey ${firstName},</p><p>Your ${planId} plan is now active. Total charged: $${amount / 100}/mo.</p><a href="https://app.hirenext.app/dashboard" style="background:#1D9E75;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">Open dashboard</a></div>`
    })
  } catch (e) { console.error('Payment email error:', e) }
}
