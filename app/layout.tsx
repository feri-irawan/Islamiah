import BottomNavigation from '@/components/bottom-navigation'
import Header from '@/components/header'
import '@/styles/globals.css'
import { cn } from '@/utils/cn'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Islamiah',
  description:
    "Aplikasi web yang berisi Qur'an, informasi jadwal sholat, kalender sholat, dan berita-berita islam lainnya.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={cn(inter.className, 'text-foreground')}>
        <Header />
        <main className="pb-[5rem]">{children}</main>
        <BottomNavigation />
      </body>
    </html>
  )
}
