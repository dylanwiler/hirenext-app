import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10', typescript: true })
export const PLANS = {
  solo: { id:'solo', name:'Solo', price:199, priceId:process.env.STRIPE_PRICE_SOLO!, limits:{roles:1,resumes:100,interviews:10} },
  growth: { id:'growth', name:'Growth', price:349, priceId:process.env.STRIPE_PRICE_GROWTH!, limits:{roles:3,resumes:300,interviews:30} },
  scale: { id:'scale', name:'Scale', price:599, priceId:process.env.STRIPE_PRICE_SCALE!, limits:{roles:8,resumes:600,interviews:60} },
} as const
export type PlanId = keyof typeof PLANS