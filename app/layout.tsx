import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import './globals.css'
export const metadata: Metadata = {
  title: { default: 'Hire Next AI', template: '%s | Hire Next AI' },
  description: 'AI-powered recruiting OS for home service businesses.',
  metadataBase: new URL('https://hirenext.app'),
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#181818', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EFEA' } }} />
      </body>
    </html>
  )
}