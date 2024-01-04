import { Metadata } from 'next'
import { Suspense } from 'react'
import { SurahList, SurahListSkeletons } from './surah-list'
import { SurahTafsirModal } from './surah-tafsir-modal'
import VerseLastReadCard from './verse-last-read-card'

export const metadata: Metadata = {
  title: 'Qur’an',
  description: "Daftar surah dalam Qur'an.",
}

export default function Quran() {
  return (
    <main className="grid gap-4 p-4">
      <h1 className="text-3xl font-bold text-primary">Qur&apos;an</h1>
      <VerseLastReadCard />

      <Suspense fallback={<SurahListSkeletons />}>
        <SurahList />
      </Suspense>

      <SurahTafsirModal />
    </main>
  )
}
