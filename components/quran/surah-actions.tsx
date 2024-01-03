import { ButtonNextSurah, ButtonPreviousSurah } from './surah-pagination'
import { VerseCardOptions } from './verse-card-options'

export default function SurahActions() {
  return (
    <div className="flex px-4 justify-between gap-4 items-center bg-white">
      <ButtonPreviousSurah />
      <VerseCardOptions />
      <ButtonNextSurah />
    </div>
  )
}
