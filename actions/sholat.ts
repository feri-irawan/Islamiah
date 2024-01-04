import axios from 'axios'
import { format } from 'date-fns'

export type Timing = {
  name: string
  value: Date
}

type HijriWeekday = {
  en: string
  ar: string
}

type HijriMonth = {
  number: number
  en: string
  ar: string
}

type HijriDesignation = {
  abbreviated: string
  expanded: string
}

type Hijri = {
  date: string
  format: string
  day: string
  weekday: HijriWeekday
  month: HijriMonth
  year: string
  designation: HijriDesignation
  holidays: any[]
}

type GregorianWeekday = {
  en: string
}

type GregorianMonth = {
  number: number
  en: string
}

type GregorianDesignation = {
  abbreviated: string
  expanded: string
}

type Gregorian = {
  date: string
  format: string
  day: string
  weekday: GregorianWeekday
  month: GregorianMonth
  year: string
  designation: GregorianDesignation
}

type DateInfo = {
  readable: string
  timestamp: string
  hijri: Hijri
  gregorian: Gregorian
}

type MethodParams = {
  shafaq: string
}

type Method = {
  id: number
  name: string
  params: MethodParams
}

type Offset = {
  Imsak: number
  Fajr: number
  Sunrise: number
  Dhuhr: number
  Asr: number
  Maghrib: number
  Sunset: number
  Isha: number
  Midnight: number
}

type Meta = {
  latitude: number
  longitude: number
  timezone: string
  method: Method
  latitudeAdjustmentMethod: string
  midnightMode: string
  school: string
  offset: Offset
}

export type PrayerTimes = {
  timings: Timing[]
  date: DateInfo
  meta: Meta
}

type Options = {
  latitude: string
  longitude: string
  method?: string
  date: Date
}

/** Get prayer times */
export async function getPrayerTimes({
  date,
  ...queries
}: Options): Promise<PrayerTimes> {
  // Request params
  const formattedDate = format(date, 'dd-MM-yyyy')
  const query = new URLSearchParams({
    method: '3', // 3 is Muslim World League method
    iso8601: 'true',
    ...queries,
  })

  // Get data
  const apiURL = `https://api.aladhan.com/v1/timings/${formattedDate}?${query}`
  const { data } = await axios.get(apiURL)
  const result = data.data

  // Re map and sort
  const timings = Object.keys(result.timings)
    .map((key) => ({
      name: key,
      value: new Date(result.timings[key]),
    }))
    .sort((a, b) => a.value.getTime() - b.value.getTime())

  return {
    ...result,
    timings,
  }
}
