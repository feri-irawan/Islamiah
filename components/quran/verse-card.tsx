'use client'

import { SurahContent, Verse } from '@/actions/surah'
import { cn } from '@/utils/cn'
import copy from 'copy-to-clipboard'
import { Check, LinkIcon, Pin } from 'lucide-react'
import { createContext, useContext, useState } from 'react'
import { useVerseCardOptions } from './verse-card-options'
import { useVerseLastRead } from './verse-last-read-card'

type TVerseContext = {
  verse: Verse | null
  surah: SurahContent | null
}

export const VerseCardContext = createContext<TVerseContext>({
  verse: null,
  surah: null,
})

type VerseCardProps = {
  verse: Verse
  surah: SurahContent
}

export function VerseCard({ verse, surah }: VerseCardProps) {
  const { showAudio, showLatin, showTranslation, showTafsir } =
    useVerseCardOptions()

  return (
    <VerseCardContext.Provider value={{ verse, surah }}>
      <article
        id={verse.number.inSurah.toString()}
        className="flex gap-3 offset-t-4"
      >
        <div className="pt-2">
          <div className="sticky top-4 flex flex-col items-center gap-2">
            <VerseNumber />
            <VerseMarkAsLastRead />
            <VerseCopyLink />
          </div>
        </div>
        <div className="flex-1 grid gap-3">
          <VerseMushaf />
          {showLatin && <VerseLatin />}
          {showAudio && <VerseAudio />}
          {showTranslation && <VerseTranslation />}
          {showTafsir && <VerseTafsir />}
        </div>
      </article>
    </VerseCardContext.Provider>
  )
}

function VerseNumber() {
  const { verse } = useContext(VerseCardContext)

  if (!verse) throw new Error('VerseNumber must be used within VerseCard')

  return <div className="verse-number">{verse.number.inSurah}</div>
}

function VerseMushaf() {
  const { verse } = useContext(VerseCardContext)

  if (!verse) throw new Error('VerseMushaf must be used within VerseCard')

  return (
    <p className="font-mushaf text-right text-2xl leading-10">
      {verse.text.arab}
    </p>
  )
}

function VerseAudio() {
  const { verse } = useContext(VerseCardContext)

  if (!verse) throw new Error('VerseAudio must be used within VerseCard')

  const src = verse.audio.primary
  const verseNumber = verse.number.inSurah

  // Putar audio dan pause audio lainnya
  const onPlay = () => {
    const audios = document.querySelectorAll('audio')
    audios.forEach((audio) => {
      if (audio.src !== src) {
        audio.pause()
        audio.currentTime = 0
      }
    })
  }

  // Putar audio berikutnya
  const nextAudio = () => {
    const audios = document.querySelectorAll('audio')
    const next = audios.item(verseNumber) // index audio item mulai dari 0, tapi verseNumber mulai dari 1, makanya next audio tidak perlu ditambah 1 lagi, karna 1 itu berarti index audio di ayat ke-2

    if (next) {
      next.play()
    }
  }

  return (
    <div className="overflow-hidden flex items-center h-5">
      <audio
        className="w-full"
        preload="none"
        src={src}
        controls={true}
        onPlay={onPlay}
        onEnded={nextAudio}
      />
    </div>
  )
}

function VerseLatin() {
  const { verse } = useContext(VerseCardContext)

  if (!verse) throw new Error('VerseLatin must be used within VerseCard')

  return (
    <p className="italic text-primary text-sm">
      {verse.text.transliteration.en}
    </p>
  )
}

function VerseTranslation() {
  const { verse } = useContext(VerseCardContext)

  if (!verse) throw new Error('VerseTranslation must be used within VerseCard')

  return <p className="text-sm leading-6">{verse.translation.id}</p>
}

function VerseTafsir() {
  const { verse } = useContext(VerseCardContext)

  if (!verse) throw new Error('VerseTafsir must be used within VerseCard')

  return (
    <p className="text-sm leading-6">
      <strong>Tafsir:</strong> {verse.tafsir.id.short}
    </p>
  )
}

function getVersePath() {
  const { verse, surah } = useContext(VerseCardContext)
  if (!verse || !surah)
    throw new Error('getVersePath must be used within VerseCard')

  return `/quran/${surah.number}#${verse.number.inSurah}`
}

function VerseMarkAsLastRead() {
  const { verse, surah } = useContext(VerseCardContext)

  if (!surah || !verse)
    throw new Error('VerseMarkAsLastRead must be used within VerseCard')

  const path = getVersePath()

  const { setVerseLastRead, verse: verseLastRead } = useVerseLastRead()

  const isActive = verseLastRead?.number.inSurah === verse.number.inSurah

  return (
    <button
      onClick={() => setVerseLastRead({ verse, surah, path })}
      className={cn(
        'flex h-[2rem] w-[2rem] items-center justify-center active:scale-95 rounded-full duration-200 hover:bg-primary-100',
        isActive && 'bg-primary-100 text-primary',
      )}
    >
      <Pin className="w-4" />
    </button>
  )
}

function VerseCopyLink() {
  const path = getVersePath()
  const [copied, setCopied] = useState(false)

  const onClick = () => {
    copy(location.origin + path)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <button
      onClick={onClick}
      className="flex h-[2rem] w-[2rem] items-center justify-center active:scale-95 rounded-full duration-200 hover:bg-primary-100"
    >
      {copied ? <Check className="w-4" /> : <LinkIcon className="w-4" />}
    </button>
  )
}
