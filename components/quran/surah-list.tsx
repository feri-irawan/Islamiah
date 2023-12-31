import { getAllSurah } from '@/actions/surah'
import { SurahCard } from './surah-card'

function SurahListGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
      {children}
    </div>
  )
}

export function SurahListSkeleton({ length = 10 }: { length: number }) {
  return <SurahListGrid>a</SurahListGrid>
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
