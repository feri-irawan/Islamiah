import { useEffect } from 'react'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'
import LastReadCard from '../../components/quran/LastReadCard'
import SurahCard from '../../components/quran/SurahCard'
import { useQuranListSurah } from '../../utils/quran'

export default function Quran() {
  const { listSurah, loading, error, getListSurah } = useQuranListSurah()

  useEffect(() => {
    getListSurah()
  }, [])

  return (
    <Layout name="Qur'an">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Qur'an</h1>

      <LastReadCard />

      {loading && <Loading message="Memuat semua surah..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      {listSurah && (
        <div className="grid md:grid-cols-2 gap-4">
          {listSurah.map((surah, i) => (
            <SurahCard key={i} surah={surah} />
          ))}
        </div>
      )}
    </Layout>
  )
}
