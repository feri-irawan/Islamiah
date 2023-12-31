'use client'

import { Verse } from '@/actions/surah'
import copy from 'copy-to-clipboard'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { useQuranLastRead } from '../../utils/quran'
import ClipboardCheckFill from '../icons/ClipboardCheckFill'
import ClipboardIcon from '../icons/ClipboardIcon'
import PinAngleIcon from '../icons/PinAngleIcon'
import PinFill from '../icons/PinFill'

type VerseCardOptions = {
  offsetOn?: boolean
  showLatin?: boolean
  showAudio?: boolean
  showTranslation?: boolean
  showLastReadButton?: boolean
  setOptions: (options: VerseCardOptions) => void
}

type VerseCardProps = {
  verse: Verse
}

export const useVerseCardOptions = create<VerseCardOptions>((set) => ({
  setOptions: (options) => set({ ...options }),
}))

export default function VerseCard({ verse }: VerseCardProps) {
  const { lastRead, setLastRead } = useQuranLastRead()
  const [displayMenu, setDisplayMenu] = useState(false)
  const [verseLink, setVerseLink] = useState('')
  const [copied, setCopied] = useState(false)

  const { number, text, translation, audio } = verse
  const {
    showLatin,
    showAudio,
    showTranslation,
    offsetOn,
    showLastReadButton,
  } = useVerseCardOptions()

  // Jika tafsir masing masing ayat ingin ditambahkan
  // const [displayTafsirVerse, setDisplayTafsirVerse] = useState(false)

  useEffect(() => {
    setVerseLink(
      window.location.origin + window.location.pathname + '#' + number.inSurah,
    )
  }, [])

  // Copy verse link
  const copyVerseLink = (link: string) => {
    const copied = copy(link)

    if (copied) setCopied(true)

    setTimeout(() => setCopied(false), 5000)
  }

  // Jika audio di play, pause audio lainnya
  const onPlay = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audios = document.querySelectorAll('audio')
    audios.forEach((audio) => {
      if (audio.src !== e.currentTarget.src) {
        audio.pause()
        audio.currentTime = 0
      }
    })
    e.currentTarget.play()
  }

  // Jika audio sudah selesai, putar audio berikutnya jika masih ada
  const nextAudio = () => {
    const audios = document.querySelectorAll('audio')
    const next = audios.item(number.inSurah)

    if (next) {
      const a = document.createElement('a')
      a.href = window.location.pathname + '#' + (number.inSurah + 1)
      a.click()
      next.play()
    }
  }

  return (
    <div
      id={number.inSurah.toString()}
      className={offsetOn ? 'mb-4 -mt-16 pt-16' : ''}
    >
      <div onDoubleClick={() => setDisplayMenu(!displayMenu)} className="flex">
        <div className="verse-number font-bold text-rose-500 mr-3">
          <div className="sticky top-14 bg-rose-200 px-3 py-1.5 rounded-full">
            {number.inSurah}
          </div>
        </div>
        <div className="w-full">
          {/* Arab */}
          <p className="text-right font-serif text-2xl">
            <span className="font-mushaf leading-loose">{text.arab}</span>
          </p>

          {/* Latin */}
          {showLatin && (
            <em className="text-rose-700/50 block mt-3">
              {text.transliteration.en}
            </em>
          )}

          {/* Translate */}
          {showTranslation && <p className="block mt-2">{translation.id}</p>}

          <div className="mt-3 flex flex-wrap items-center">
            {/* Audio */}
            {showAudio && (
              <div className="overflow-hidden flex justify-center items-center h-5 mr-3 w-full">
                <audio
                  className="w-full"
                  src={audio.primary}
                  preload="none"
                  controls={true}
                  onPlay={onPlay}
                  onEnded={nextAudio}
                />
              </div>
            )}
          </div>

          {/* Tafsir masing-masing ayat */}
          {/* {displayTafsirVerse && <p className="mt-3">{tafsir.id.short}</p>} */}
          {/* {displayTafsirVerse && <p className="mt-3">{tafsir.id.long}</p>} */}
        </div>
      </div>

      {/* Options */}
      <div
        className={`overflow-hidden duration-300 ${
          displayMenu ? 'h-[1.5rem]' : 'h-0'
        }`}
      >
        <div className="flex gap-4 px-3 justify-between">
          {/* Copy link button */}
          <div
            title="Salin link ayat"
            className="flex items-center gap-2 cursor-pointer hover:text-rose-500 duration-300"
            onClick={() => copyVerseLink(verseLink)}
          >
            {!copied ? <ClipboardIcon /> : <ClipboardCheckFill />}
            <span>{!copied ? 'Salin link' : 'Tersalin!'}</span>
          </div>

          {/* Last read button */}
          {showLastReadButton && (
            <div
              title="Tandai terakhir dibaca"
              className="flex items-center gap-2 cursor-pointer hover:text-rose-500 duration-300"
              onClick={() => setLastRead({ ...verse, link: verseLink })}
            >
              {lastRead?.number.inQuran !== number.inQuran ? (
                <PinAngleIcon />
              ) : (
                <PinFill />
              )}
              <span>
                {lastRead?.number.inQuran !== number.inQuran
                  ? 'Terakhir dibaca'
                  : 'Ditandai terakhir'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
