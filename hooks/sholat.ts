'use client'

import { Timing } from '@/actions/sholat'
import { useEffect, useState } from 'react'

type Countdown = {
  hours: number
  minutes: number
  seconds: number
}

export function useNextPrayer(timings: Timing[]) {
  const [nextPrayer, setNextPrayer] = useState<Timing | null>(null)
  const [countdown, setCountdown] = useState(getCountdown(timings[0].value))

  // Update next prayer every second
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPrayer = getNextPrayer(timings)

      if (!nextPrayer) return

      setNextPrayer(nextPrayer)
      setCountdown(getCountdown(nextPrayer.value))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { nextPrayer, countdown }
}

/** Get the next prayer */
function getNextPrayer(timings: Timing[]) {
  const now = new Date()
  const currentPrayerIndex = timings.findIndex((timing) => timing.value > now)
  const next = currentPrayerIndex >= 0 ? timings[currentPrayerIndex] : null

  return next
}

/** Get count down to the next prayer */
function getCountdown(target: Date): Countdown {
  const distance = target.getTime() - new Date().getTime()

  const [oneDay, oneHour, oneMinute, oneSecond] = [
    1000 * 60 * 60 * 24,
    1000 * 60 * 60,
    1000 * 60,
    1000,
  ]

  const hours = Math.floor((distance % oneDay) / oneHour)
  const minutes = Math.floor((distance % oneHour) / oneMinute)
  const seconds = Math.floor((distance % oneMinute) / oneSecond)

  return { hours, minutes, seconds }
}

/** Adzan audio */
export function useAdzan() {
  const [adzan, setAdzan] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = document.createElement('audio')
    audio.src = '/adzan.mp3'
    setAdzan(audio)
  }, [])

  return adzan
}
