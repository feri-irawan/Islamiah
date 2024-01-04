'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export default function Time() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return '00:00:00'

  return format(time, 'HH:mm:ss')
}
