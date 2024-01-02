import { getSurah } from '@/actions/surah'
import { VerseCard } from '@/components/quran/verse-card'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    surah: string
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const surah = await getSurah(params.surah)

  if (!surah) notFound()

  return {
    title: `Q.S. ${surah.name.transliteration.id} (${surah.name.translation.id}) - Islamiah`,
    description: `Surah ke-${surah.number}, terdiri dari ${surah.numberOfVerses} ayat dan golongan surah ${surah.revelation.id}.`,
    keywords: [
      surah.name.transliteration.id,
      surah.name.translation.id,
      'Islamiah',
      'Al-Quran',
    ],
    openGraph: {
      images: `https://fiimage.vercel.app/og?url=https://islamiah.vercel.app/quran/surah/${params.surah}`,
    },
  }
}

export default async function Surah({ params }: { params: { surah: string } }) {
  const surah = await getSurah(params.surah)

  if (!surah) notFound()

  return (
    <section className="pb-5">
      <header className="flex flex-col items-center pt-4">
        <h2 className="font-bold text-xl font-mushaf mb-3">
          {surah.name.short}
        </h2>
        <h2 className="text-primary font-bold text-xl">
          {surah.name.transliteration.id}
        </h2>
        <h3>{surah.name.translation.id}</h3>
      </header>

      <div className="grid p-4 gap-4">
        {surah.verses.map((verse) => (
          <VerseCard key={verse.number.inSurah} surah={surah} verse={verse} />
        ))}
      </div>
    </section>
  )
}
