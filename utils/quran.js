import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const surahEndpoint = 'https://api.quran.gading.dev/surah/'

export const useQuranListSurah = create(
  persist(
    (set, get) => ({
      // Initial states
      listSurah: [],
      loading: false,
      error: false,

      // Mendapatkan list surah
      getListSurah: async () => {
        // Jika list surah sudah ada jangan refetch
        if (get().listSurah.length > 0) return

        // Jika list surah tidak ada (masih kosong), maka fetch
        set({ loading: true, error: false })

        await fetch(surahEndpoint)
          .then((res) => res.json())
          .then(({ data }) => set({ listSurah: data }))
          .catch(() => set({ error: true }))

        set({ loading: false })
      },
    }),
    {
      name: 'quran',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useQuranSurah = create(
  persist(
    (set, get) => ({
      // Initial states
      surahs: [],
      loading: false,
      error: false,
      currentSurah: null,

      // Cek apakah surah sudah ada (tersimpan di localStorage)
      existSurah: (number) => {
        const surah = get().surahs.find((surah) => surah.number === number)

        // Ubah current surah
        if (surah) set({ currentSurah: surah })

        return surah ? true : false
      },

      // Set states
      setSurah: (surah) => {
        // Ubah current surah
        set({ currentSurah: surah })

        // Cek apakah surah surah ada, jika true, jangan push lagi
        if (get().existSurah(surah.number)) return

        // Jika surah belum ada, maka push surah kedalam surahs
        const surahs = get().surahs
        surahs.push(surah)

        set({ surahs })
      },

      // Mendapatkan data 1 surah berdasarkan number
      getSurah: async (number) => {
        // Cek apakah surah sudah ada, jika true, jangan refetch
        if (get().existSurah(number)) return

        // Jika surah belum tersimpan di localStorage
        set({ loading: true, error: false })

        await fetch(surahEndpoint + number)
          .then((res) => res.json())
          .then(({ data }) => get().setSurah(data))
          .catch(() => set({ error: true }))

        set({ loading: false })
      },
    }),
    {
      name: 'quran-surahs',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useQuranSurahOption = create(
  persist(
    (set) => ({
      displayTafsir: false,
      displayLatin: false,
      displayAudio: false,
      displayTranslate: false,

      // Set oldOption ke newOption
      setOption: (newOption) =>
        set((oldOptions) => ({ ...oldOptions, ...newOption })),
    }),
    {
      name: 'quran-surah-option',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

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
