import LastReadCard from '@/components/quran/last-read-card'
import { SurahList } from '@/components/quran/surah-list'
import { SurahTafsirModal } from '@/components/quran/surah-tafsir-modal'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Qur’an',
  description: "Daftar surah dalam Qur'an.",
}

export default function Quran() {
  return (
    <main className="grid gap-4 p-4">
      <h1 className="text-3xl font-bold text-primary">Qur'an</h1>
      <LastReadCard />

      <Suspense fallback={<div>Loading...</div>}>
        <SurahList />
      </Suspense>

      <SurahTafsirModal />
    </main>
  )
}
