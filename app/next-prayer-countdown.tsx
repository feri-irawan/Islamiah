'use client'

import { Timing } from '@/actions/sholat'
import { useAdzan, useNextPrayer } from '@/hooks/sholat'

type NextPrayerCountdownProps = {
  timings: Timing[]
}

export default function NextPrayerCountdown({
  timings,
}: NextPrayerCountdownProps) {
  const { nextPrayer, countdown } = useNextPrayer(timings)
  const adzan = useAdzan()

  if (!nextPrayer) return null

  let countdownText = ''
  if (countdown.hours > 0) countdownText += `${countdown.hours} jam `
  if (countdown.minutes > 0) countdownText += `${countdown.minutes} menit `
  if (countdown.seconds > 0) countdownText += `${countdown.seconds} detik `

  if (countdownText === '') {
    adzan?.play()
    return null
  }

  return (
    <div>
      Sekitar <strong>{countdownText}</strong> lagi menuju{' '}
      <strong>{nextPrayer.name}</strong>
    </div>
  )
}
