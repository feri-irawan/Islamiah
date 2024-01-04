'use client'

import { Surah } from '@/actions/surah'
import { cn } from '@/utils/cn'
import { InfoIcon } from 'lucide-react'
import { useEffect } from 'react'
import { create } from 'zustand'

type UseSurahTafsirModal = {
  surah?: Surah
  open?: boolean
  toggle: (surah?: Surah) => void
}

export const useSurahTafsirModal = create<UseSurahTafsirModal>((set) => ({
  toggle: (surah) => {
    set((prev) => ({ ...prev, open: !prev.open, surah }))
  },
}))

export function SurahTafsirModal() {
  const { surah, open, toggle } = useSurahTafsirModal()

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggle()
    }

    addEventListener('keydown', onEsc)
    document.body.style.overflow = open ? 'hidden' : 'auto'

    return () => {
      removeEventListener('keydown', onEsc)
    }
  }, [open, toggle])

  return (
    <section
      className={cn(
        'flex items-center fixed inset-0 z-10 duration-200 justify-center p-4 invisible opacity-0',
        open && 'visible opacity-100',
      )}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => toggle()}
      ></div>
      <div className="w-full max-w-[25rem] bg-white rounded-lg flex flex-col h-[70vh] z-10">
        <header className="p-4">
          <div className="flex bg-primary text-primary-foreground p-3 rounded-lg justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-bold">
                {surah?.name.transliteration.id}
              </h2>
              <h3 className="font-bold text-sm">
                {surah?.name.translation.id}
              </h3>
            </div>
            <div className="text-3xl font-mushaf">{surah?.name.short}</div>
          </div>
        </header>
        <div className="overflow-auto flex-1 px-4 text-sm leading-6">
          {surah?.tafsir.id}
        </div>
        <div className="p-4">
          <button
            onClick={() => toggle()}
            className="p-2 w-full rounded-lg bg-primary text-primary-foreground"
          >
            Tutup
          </button>
        </div>
      </div>
    </section>
  )
}

export function ButtonSurahTafsirModal({ surah }: { surah?: Surah }) {
  return (
    <button
      title="Tafsir"
      className="outline-none focus:bg-primary focus:text-primary-foreground rounded-full"
      onClick={() => useSurahTafsirModal.getState().toggle(surah)}
    >
      <InfoIcon className="w-4 h-4" />
    </button>
  )
}
