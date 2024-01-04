import { getPrayerTimes } from '@/actions/sholat'
import { Metadata } from 'next'
import NextPrayerCountdown from './next-prayer-countdown'
import PrayerCards from './prayer-cards'
import TodayCard from './today-card'

export const metadata: Metadata = {
  title: 'Jadwal Sholat - Islamiah',
  description: 'Cek jadwal sholat di lokasi Anda.',
  keywords: [
    'jadwal',
    'quran',
    'solat',
    'sholat',
    'berita',
    'kalender',
    'al-quran',
    'islamiah',
    'islam',
  ],
  openGraph: {
    images: `https://fiimage.vercel.app/og?url=https://islamiah.vercel.app`,
  },
}

export default async function Home() {
  const { timings, date, meta } = await getPrayerTimes({
    date: new Date(),
    latitude: '-5.433706539672451',
    longitude: '120.20422548732783',
  })

  return (
    <section className="grid p-6 gap-4">
      <h1 className="text-3xl font-bold text-primary">Jadwal Sholat</h1>
      <TodayCard date={date} meta={meta} />
      <NextPrayerCountdown timings={timings} />
      <PrayerCards timings={timings} />
    </section>
  )
}
