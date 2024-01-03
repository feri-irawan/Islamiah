import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function getNextAndPreviousSurah() {
  const { surah } = useParams()
  const currentSurah = parseInt(surah as string)
  
  let nextSurah = currentSurah + 1
  nextSurah = nextSurah > 114 ? 1 : nextSurah

  let previousSurah = currentSurah - 1
  previousSurah = previousSurah < 1 ? 114 : previousSurah

  return { nextSurah, previousSurah }
}

export function ButtonNextSurah() {
  const { nextSurah } = getNextAndPreviousSurah()

  return (
    <Link
      href={`/quran/${nextSurah}`}
      className="flex items-center rounded-full justify-center h-[2rem] w-[2rem] hover:bg-primary-100 duration-200 active:text-primary active:scale-95"
    >
      <ChevronRight />
    </Link>
  )
}

export function ButtonPreviousSurah() {
  const { previousSurah } = getNextAndPreviousSurah()

  return (
    <Link
      href={`/quran/${previousSurah}`}
      className="flex items-center rounded-full justify-center h-[2rem] w-[2rem] hover:bg-primary-100 duration-200 active:text-primary active:scale-95"
    >
      <ChevronLeft />
    </Link>
  )
}
