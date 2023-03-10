import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useQuranLastRead = create(
  persist(
    (set) => ({
      lastRead: null,
      setLastRead: (link) => set({ lastRead: link }),
    }),
    {
      name: 'quran-last-read',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
