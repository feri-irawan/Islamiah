import { Surah } from '@/actions/surah'
import Link from 'next/link'
import { ButtonSurahTafsirModal } from './surah-tafsir-modal'

export function SurahCard(surah: Surah) {
  return (
    <article className="relative">
      <Link
        href={`/quran/${surah.number}`}
        className="outline-primary rounded-lg"
      >
        <div className="flex rounded-[inherit] shadow overflow-hidden hover:bg-primary-50 active:bg-primary-100">
          <div className="bg-primary text-primary-foreground p-3 flex items-center">
            {surah.number}
          </div>
          <div className="flex-1 p-3 grid gap-2">
            <header className="flex justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-primary">
                  {surah.name.transliteration.id}
                </h2>
                <h3 className="text-sm">{surah.name.translation.id}</h3>
              </div>
              <div className="text-2xl sm:text-2xl font-mushaf">
                {surah.name.short}
              </div>
            </header>
            <footer className="text-sm flex justify-between items-center">
              {surah.numberOfVerses} ayat, surah {surah.revelation.id}
            </footer>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-2 right-3">
        <ButtonSurahTafsirModal surah={surah} />
      </div>
    </article>
  )
}
