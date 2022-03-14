import {useEffect, useState} from 'react'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'
import {indonesianDate} from '../../utils/jadwal-sholat'

export default function Kalender() {
  const [calendar, setCalendar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const d = new Date()

  // Fetch data
  useEffect(() => {
    // Query string
    const query = new URLSearchParams({
      latitude: -5.432785335037951,
      longitude: 120.20395726642634,
      method: 15,
    })

    setLoading(true)
    fetch(`http://api.aladhan.com/v1/calendar?${query}`)
      .then((res) => res.json())
      .then(({data}) => {
        setCalendar(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  return (
    <Layout name="Kalender">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Kalender</h1>

      <div className="text-center mb-3">
        <p>
          Sekarang tanggal <strong>{indonesianDate()}</strong>
        </p>
        <p>
          Berikut ini kalender sholat khusus bulan{' '}
          <strong>{d.getMonth() + 1}</strong> tahun{' '}
          <strong>{d.getFullYear()}</strong>
        </p>
      </div>

      {loading && <Loading message="Memuat kalender..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      {calendar && (
        <div className="overflow-x-auto">
          <table className="table-fixed">
            <thead>
              <tr className="divide-x text-rose-500">
                <th className="p-3">Tanggal</th>
                {Object.keys(calendar[0].timings).map((name) => (
                  <th className="p-3">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendar.map(({timings, date}, i) => (
                <tr
                  key={i}
                  className={`font-semibold whitespace-nowrap ${
                    date.gregorian.day === String(d.getDate()).padStart(2, '0')
                      ? 'bg-rose-400 text-white'
                      : 'odd:bg-rose-100'
                  }`}
                >
                  <td className="p-3">
                    {date.gregorian.day}/{date.gregorian.month.number}/
                    {date.gregorian.year}
                  </td>
                  {Object.values(timings).map((time, i) => (
                    <td className="p-3" key={i}>
                      {time.slice(0, 5)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}
