import {useEffect, useState} from 'react'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'
import SurahCard from '../../components/SurahCard'

export default function Quran() {
  const [listSurah, setListSurah] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.quran.gading.dev/surah')
      .then((res) => res.json())
      .then(({data}) => {
        setListSurah(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  return (
    <Layout name="Qur'an">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Qur'an</h1>

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

// export async function getStaticProps(params) {}
