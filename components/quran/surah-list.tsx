import { getAllSurah } from '@/actions/surah'
import { cn } from '@/utils/cn'
import { ComponentProps } from 'react'
import { SurahCard } from './surah-card'

function SurahListGrid({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SurahListSkeletons({ length = 10 }: { length?: number }) {
  return (
    <SurahListGrid className="animate-pulse *:bg-gray-200 *:h-[6rem] *:rounded-lg">
      {[...Array(length)].map((_, i) => (
        <div key={i} />
      ))}
    </SurahListGrid>
  )
}

export async function SurahList() {
  const allSurah = await getAllSurah()
  return (
    <SurahListGrid>
      {allSurah.map((surah) => (
        <SurahCard key={surah.number} {...surah} />
      ))}
    </SurahListGrid>
  )
}
