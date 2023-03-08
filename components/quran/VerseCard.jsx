import copy from 'copy-to-clipboard'
import { useState } from 'react'

export default function VerseCard({ verse, options }) {
  const [copied, setCopied] = useState(false)

  const { number, text, translation, audio } = verse
  const { displayLatin, displayAudio, displayTranslate } = options

  // Jika tafsir masing masing ayat ingin ditambahkan
  // const [displayTafsirVerse, setDisplayTafsirVerse] = useState(false)

  const copyVerseLink = () => {
    const copied = copy(
      window.location.origin + window.location.pathname + '#' + number.inSurah
    )

    if (copied) setCopied(true)

    setTimeout(() => setCopied(false), 5000)
  }

  return (
    <div id={number.inSurah} className="mb-4 -mt-16 pt-16">
      <div
        onDoubleClick={copyVerseLink}
        className={`flex ${
          copied && 'ring ring-offset-4 ring-rose-200 rounded'
        }`}
      >
        <div className="verse-number font-bold text-rose-500 mr-3">
          <div className="sticky top-14 bg-rose-200 px-3 py-1.5 rounded-full">
            {number.inSurah}
          </div>
        </div>
        <div className="w-full">
          {/* Copy alert */}
          {copied && (
            <div className="px-4 my-2 bg-rose-200 text-center rounded">
              Link ayat {number.inSurah} berhasil disalin.
            </div>
          )}

          {/* Arab */}
          <p className="text-right font-serif text-2xl">
            <span className="font-mushaf leading-loose">{text.arab}</span>
          </p>

          {/* Latin */}
          {displayLatin && (
            <em className="text-rose-700/50 block mt-3">
              {text.transliteration.en}
            </em>
          )}

          {/* Translate */}
          {displayTranslate && <p className="block mt-2">{translation.id}</p>}

          <div className="mt-3 flex flex-wrap items-center">
            {/* Audio */}
            {displayAudio && (
              <div className="overflow-hidden flex justify-center items-center h-5 mr-3 w-full">
                <audio
                  className="w-full"
                  src={audio.primary}
                  preload="none"
                  controls={true}
                />
              </div>
            )}
          </div>

          {/* Tafsir masing-masing ayat */}
          {/* {displayTafsirVerse && <p className="mt-3">{tafsir.id.short}</p>} */}
          {/* {displayTafsirVerse && <p className="mt-3">{tafsir.id.long}</p>} */}
        </div>
      </div>
    </div>
  )
}
