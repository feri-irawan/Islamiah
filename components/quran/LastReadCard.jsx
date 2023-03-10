import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuranLastRead } from '../../utils/quran'
import VerseCard from './VerseCard'

export default function LastReadCard() {
  const { lastRead } = useQuranLastRead()
  const [loaded, setLoaded] = useState()

  // Mengatasi hydration
  useEffect(() => {
    setLoaded(true)
  }, [lastRead])

  return (
    loaded &&
    lastRead && (
      <div className="shadow p-3 rounded-lg mb-4">
        <h1 className="text-lg font-bold text-center mb-3">Terakhir dibaca</h1>

        <VerseCard
          verse={lastRead}
          options={{
            displayLatin: false,
            displayAudio: false,
            displayTranslate: true,
            showLastReadButton: false,
          }}
        />

        <div className="text-right">
          <Link
            href={lastRead.link}
            className="inline-block py-2 text-center px-3 rounded bg-rose-300 text-white hover:bg-rose-500 duration-300"
          >
            Lanjutkan
          </Link>
        </div>
      </div>
    )
  )
}
