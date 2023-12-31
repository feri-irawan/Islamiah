'use server'

import axios from 'axios'

const SURAH_ENDPOINT = 'https://api.quran.gading.dev/surah/'

type Transliteration = {
  en: string
  id: string
}

type Translation = {
  en: string
  id: string
}

type Name = {
  short: string
  long: string
  transliteration: Transliteration
  translation: Translation
}

type Revelation = {
  arab: string
  en: string
  id: string
}

type Tafsir = {
  id: string
}

type Text = {
  arab: string
  transliteration: Omit<Transliteration, 'id'>
}

type Meta = {
  juz: number
  page: number
  manzil: number
  ruku: number
  hizbQuarter: number
  sajda: {
    recommended: boolean
    obligatory: boolean
  }
}

type Audio = {
  primary: string
  secondary: string[]
}

type PreBismillah = {
  text: Text
  translation: Translation
  audio: Audio
}

type NumberInQuran = {
  inQuran: number
  inSurah: number
}

type VerseTafsir = {
  id: {
    short: string
    long: string
  }
}

export type Verse = {
  number: NumberInQuran
  meta: Meta
  text: Text
  translation: Translation
  audio: Audio
  tafsir: VerseTafsir
}

/** This type for surah card */
export type Surah = {
  number: number
  sequence: number
  numberOfVerses: number
  name: Name
  revelation: Revelation
  tafsir: Tafsir
}

/** This type for surah page */
export type SurahContent = {
  number: number
  sequence: number
  numberOfVerses: number
  name: Name
  revelation: Revelation
  tafsir: Tafsir
  preBismillah: PreBismillah
  verses: Verse[]
}

export async function getAllSurah(): Promise<Surah[]> {
  const { data } = await axios.get(SURAH_ENDPOINT)
  return data.data
}

export async function getSurah(
  number: string | number,
): Promise<SurahContent | null> {
  const surahNumber = Number(number)

  if (surahNumber < 1 || surahNumber > 114) return null

  const { data } = await axios.get(SURAH_ENDPOINT + number)
  return data.data
}
