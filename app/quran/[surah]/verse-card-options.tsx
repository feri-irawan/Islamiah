import { cn } from '@/utils/cn'
import { InfoIcon, LanguagesIcon, Volume2Icon } from 'lucide-react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type Options = {
  offsetOn?: boolean
  showLatin?: boolean
  showAudio?: boolean
  showTranslation?: boolean
  showTafsir?: boolean
}

type UseverseCardOptions = Options & {
  setOptions: (options: Options) => void
}

export const useVerseCardOptions = create(
  persist<UseverseCardOptions>(
    (set) => ({
      showAudio: true,
      showTranslation: true,
      setOptions: (options) => set({ ...options }),
    }),
    { name: 'verse-card-options' },
  ),
)

export function VerseCardOptions() {
  const { showLatin, showAudio, showTranslation, showTafsir, setOptions } =
    useVerseCardOptions()

  return (
    <div className="flex p-3 justify-center gap-4 items-center">
      <button
        className={cn(
          'flex gap-2 items-center text-sm',
          showLatin && 'text-primary',
        )}
        onClick={() => setOptions({ showLatin: !showLatin })}
      >
        <LanguagesIcon className="w-4" />
        <span className="hidden sm:inline">Latin</span>
      </button>
      <button
        className={cn(
          'flex gap-2 items-center text-sm',
          showAudio && 'text-primary',
        )}
        onClick={() => setOptions({ showAudio: !showAudio })}
      >
        <Volume2Icon className="w-4" />
        <span className="hidden sm:inline">Audio</span>
      </button>
      <button
        className={cn(
          'flex gap-2 items-center text-sm',
          showTranslation && 'text-primary',
        )}
        onClick={() => setOptions({ showTranslation: !showTranslation })}
      >
        <LanguagesIcon className="w-4" />
        <span className="hidden sm:inline">Terjemah</span>
      </button>
      <button
        className={cn(
          'flex gap-2 items-center text-sm',
          showTafsir && 'text-primary',
        )}
        onClick={() => setOptions({ showTafsir: !showTafsir })}
      >
        <InfoIcon className="w-4" />
        <span className="hidden sm:inline">Tafsir</span>
      </button>
    </div>
  )
}