import {useEffect, useState} from 'react'
import ErrorCard from '../components/ErrorCards'
import JadwalSholatCard from '../components/JadwalSholatCard'
import Layout from '../components/Layouts'
import Loading from '../components/Loading'
import Tracker from '../components/Tracker'
import {coords} from '../constants/location'
import {indonesianDate, indonesianName} from '../utils/jadwal-sholat'

export default function JadwalSolatHariIni() {
  // Memformat tanggal
  let d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = d.getFullYear()

  const [jadwalSholat, setJadwalSholat] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [coordinates, setCoordinates] = useState({
    latitude: coords.lat,
    longitude: coords.lng,
  })

  const [displayMap, setDisplayMap] = useState(false)

  const [today, setToday] = useState(Number(dd))
  const [tanggal, setTanggal] = useState(indonesianDate())
  const [jam, setJam] = useState(indonesianDate(true))
  const [next, setNext] = useState({name: '-', countDown: 0})

  // Fetch jadwal sholat
  useEffect(() => {
    // Query string
    const query = new URLSearchParams({
      ...coordinates,
      method: 15,
    })
    const apiURL = `https://api.aladhan.com/v1/timings/${today}-${mm}-${yyyy}?${query}`

    setLoading(true)
    fetch(apiURL)
      .then((res) => res.json())
      .then(({data}) => {
        delete data.timings['Sunset'] // Menghapus waktu sunset, karna Sunset === Maghrib
        setJadwalSholat(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [today, coordinates])

  // Mengatur waktu tanggal, jam, hari ini.
  setInterval(() => {
    setTanggal(indonesianDate())
    setJam(indonesianDate(true))

    // Sholat berikutnya.
    if (jadwalSholat) {
      if (jadwalSholat.timings) {
        // Mengambil sholat yang waktunya sudah paling dekat
        const times = Object.values(jadwalSholat.timings)
          .map((v) => new Date(`${yyyy}-${mm}-${dd}T${v}`).getTime())
          .map((v, i) => [Object.keys(jadwalSholat.timings)[i], v - Date.now()])
          .sort((a, b) => a[1] - b[1])
          .filter((v) => v[1] > 0)

        // Memperbarui tanggal jika jadwal hari ini sudah selesai
        if (times.length === 0) {
          setToday(Number(dd) + 1)
          setTanggal(indonesianDate(false, `${yyyy}-${mm}-${today}`))
        }

        // Mengatur countdown
        const distance = times[0][1]
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        // Memperbarui info sholat berikutnya
        setNext({
          name: times[0][0],
          countDown: `${(hours < 10 ? '0' : '') + hours}:${
            (minutes < 10 ? '0' : '') + minutes
          }:${(seconds < 10 ? '0' : '') + seconds}`,
        })
      }
    }
  }, 1000)

  // Memutar audio adzan
  useEffect(() => {
    const adzan = document.getElementById('adzan')
    document.body.onclick = () => {
      adzan.play()
      adzan.pause()
    }

    const {name, countDown} = next
    switch (name) {
      case 'Fajr':
      case 'Dhuhr':
      case 'Asr':
      case 'Maghrib':
      case 'Isha':
        if (countDown === '00:00:00') adzan.play()
        break

      default:
        break
    }
  })

  return (
    <Layout name="Jadwal Sholat">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Jadwal Sholat</h1>

      {loading && <Loading message="Memuat jadwal sholat..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      <div
        className={`fixed inset-0 p-3 bg-white duration-300 ${
          displayMap ? 'visible' : 'invisible'
        }`}
      >
        <h2 className="text-lg font-bold text-rose-500">Atur Lokasi</h2>
        <p>Silakan klik lokasi pada map untuk mengganti lokasi.</p>

        <Tracker callback={(coords) => setCoordinates(coords)} />

        <button
          onClick={() => setDisplayMap(!displayMap)}
          className="px-3 py-2 rounded-lg bg-rose-500 text-rose-50"
        >
          Simpan
        </button>
      </div>

      {jadwalSholat && (
        <>
          {jadwalSholat.date && (
            <>
              <p>Berikut jadwal sholat hari ini.</p>
              <button
                onClick={() => setDisplayMap(!displayMap)}
                className="px-3 py-2 mt-3 rounded-lg bg-rose-500 text-rose-50"
                title="Klik untuk mengatur lokasi sesuai keinginan"
              >
                Atur lokasi
              </button>

              <div className="grid grid-cols-2">
                <p className="flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill=""
                    className="mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>{' '}
                  {jadwalSholat.meta.timezone}
                </p>
                <p className="flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                  </svg>{' '}
                  {jadwalSholat.date.hijri.day}{' '}
                  {jadwalSholat.date.hijri.month.en}{' '}
                  {jadwalSholat.date.hijri.year}
                </p>
                <p className="flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-2 ml-0.5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                  </svg>{' '}
                  {tanggal}
                </p>
                <p className="flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                  </svg>{' '}
                  {jam}
                </p>
                <p className="my-3 col-span-2">
                  Berikutnya <strong>{next.countDown}</strong> lagi menuju{' '}
                  <strong>{indonesianName(next.name)}</strong>
                </p>
              </div>
            </>
          )}

          {/* Looping jadwal sholat */}
          {jadwalSholat.timings && (
            <div className="grid grid-cols-1 gap-3">
              {Object.keys(jadwalSholat.timings).map((key, index) => (
                <JadwalSholatCard
                  key={index}
                  sholat={{
                    name: indonesianName(key),
                    time: jadwalSholat.timings[key],
                    active: next.name === key ? true : false,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      <audio
        id="adzan"
        controls
        src="/adzan.mp3"
        className="hidden"
        loading="lazy"
      />
    </Layout>
  )
}
