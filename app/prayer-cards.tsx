'use client'

import { Timing } from '@/actions/sholat'
import { useNextPrayer } from '@/hooks/sholat'
import PrayerCard from './prayer-card'

type PrayerCardsProps = {
  timings: Timing[]
}

export default function PrayerCards({ timings }: PrayerCardsProps) {
  const { nextPrayer } = useNextPrayer(timings)

  return (
    <div className="grid gap-4">
      {timings.map((prayer) => (
        <PrayerCard
          key={prayer.name}
          {...prayer}
          isActive={nextPrayer?.name === prayer.name}
        />
      ))}
    </div>
  )
}
