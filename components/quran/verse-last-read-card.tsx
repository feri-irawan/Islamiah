'use client'

import { SurahContent, Verse } from '@/actions/surah'
import { Pin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VerseCard } from './verse-card'

type UseVerseLastRead = {
  verse: Verse | null
  surah: SurahContent | null
  path: string | null
  setVerseLastRead: ({
    verse,
    surah,
    path,
  }: {
    verse: Verse
    surah: SurahContent
    path: string
  }) => void
}

export const useVerseLastRead = create(
  persist<UseVerseLastRead>(
    (set) => ({
      verse: null,
      surah: null,
      path: null,
      setVerseLastRead: ({ verse, surah, path }) => set({ verse, surah, path }),
    }),
    { name: 'verse-last-read' },
  ),
)

export default function VerseLastReadCard() {
  const { verse, path, surah } = useVerseLastRead()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Fix hydration error
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !verse || !surah || !path) return null

  return (
    <section
      onDoubleClick={() => router.push(path)}
      className="focus:outline-primary select-none shadow rounded-xl flex flex-col p-4 outline-none hover:bg-primary-50 active:bg-primary-100 focus:bg-primary-100"
    >
      <h2 className="text-xl font-bold mb-3 text-center">
        <Pin className="inline-block mr-2 text-primary" />
        Q.S. {surah.name.transliteration.id}
      </h2>
      <VerseCard verse={verse} surah={surah} />
    </section>
  )
}
