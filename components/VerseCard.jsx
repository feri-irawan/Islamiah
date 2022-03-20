import {useState} from 'react'

export default function VerseCard({verse, options}) {
  const {number, meta, text, translation, audio, tafsir} = verse
  const {displayLatin, displayAudio, displayTranslate} = options

  // Jika tafsir masing masing ayat ingin ditambahkan
  // const [displayTafsirVerse, setDisplayTafsirVerse] = useState(false)

  return (
    <div className="flex mb-4">
      <div className="verse-number font-bold text-rose-500 mr-3">
        <div className="sticky top-3 bg-rose-200 px-3 py-1.5 rounded-full">
          {number.inSurah}
        </div>
      </div>
      <div className="w-full">
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
  )
}
