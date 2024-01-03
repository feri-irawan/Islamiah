import { cn } from '@/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function ButtonNextSurah() {
  const { surah } = useParams()
  const nextSurah = parseInt(surah as string) + 1

  return (
    <Link
      href={`/quran/${nextSurah}`}
      className={cn(
        'flex items-center rounded-full justify-center h-[2rem] w-[2rem] hover:bg-primary-100 duration-200 active:text-primary active:scale-95',
        nextSurah > 114 && 'invisible',
      )}
    >
      <ChevronRight />
    </Link>
  )
}

export function ButtonPreviousSurah() {
  const { surah } = useParams()
  const previousSurah = parseInt(surah as string) - 1

  return (
    <Link
      href={`/quran/${previousSurah}`}
      className={cn(
        'flex items-center rounded-full justify-center h-[2rem] w-[2rem] hover:bg-primary-100 duration-200 active:text-primary active:scale-95',
        previousSurah < 1 && 'invisible',
      )}
      aria-disabled={previousSurah < 1}
    >
      <ChevronLeft />
    </Link>
  )
}
