import {useEffect, useState} from 'react'
import BeritaCard from '../../components/BeritaCard'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'

export default function Berita() {
  const [berita, setBerita] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const d = new Date()

  // Fetch data
  useEffect(() => {
    setLoading(true)
    fetch('https://api-berita-indonesia.vercel.app/republika/islam/')
      .then((res) => res.json())
      .then(({data}) => {
        setBerita(data.posts)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  return (
    <Layout name="Berita">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Berita Islamic</h1>

      <p>Berikut ini adalah kumpulan berita-berita islamic.</p>

      {loading && <Loading message="Memuat berita..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      {berita && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-4">
          {berita.map((post, i) => (
            <BeritaCard berita={post} key={i} />
          ))}
        </div>
      )}
    </Layout>
  )
}
