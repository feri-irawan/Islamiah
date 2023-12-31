'use client'

import { Verse } from '@/actions/surah'
import { useVerseCardOptions } from './verse-card-options'

export function VerseCard(verse: Verse) {
  const { showAudio, showLatin, showTranslation, showTafsir } =
    useVerseCardOptions()

  return (
    <article id={verse.number.inSurah.toString()} className="flex p-4 gap-3">
      <div className="pt-2">
        <VerseNumber number={verse.number.inSurah} />
      </div>
      <div className="flex-1 grid gap-3">
        <VerseMushaf text={verse.text.arab} />
        {showLatin && <VerseLatin text={verse.text.transliteration.en} />}
        {showAudio && (
          <VerseAudio
            src={verse.audio.primary}
            verseNumber={verse.number.inSurah}
          />
        )}
        {showTranslation && <VerseTranslation text={verse.translation.id} />}
        {showTafsir && <VerseTafsir text={verse.tafsir.id.short} />}
      </div>
    </article>
  )
}

function VerseNumber({ number }: { number: number }) {
  return <div className="verse-number sticky top-4">{number}</div>
}

function VerseMushaf({ text }: { text: string }) {
  return <p className="font-mushaf text-right text-2xl leading-10">{text}</p>
}

function VerseAudio({
  src,
  verseNumber,
}: {
  src: string
  verseNumber: number
}) {
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

function VerseLatin({ text }: { text: string }) {
  return <p className="italic text-primary text-sm">{text}</p>
}

function VerseTranslation({ text }: { text: string }) {
  return <p className="text-sm leading-6">{text}</p>
}

function VerseTafsir({ text }: { text: string }) {
  return (
    <p className="text-sm leading-6">
      <strong>Tafsir:</strong> {text}
    </p>
  )
}
