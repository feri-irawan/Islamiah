import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ErrorCard from '../../../components/ErrorCards'
import Layout from '../../../components/Layouts'
import Loading from '../../../components/Loading'
import VerseCard from '../../../components/quran/VerseCard'
import {
  surahEndpoint,
  useQuranSurah,
  useQuranSurahOption,
} from '../../../utils/quran'

export default function Surah({ data }) {
  const router = useRouter()

  const {
    currentSurah: surah,
    loading,
    error,
    getSurah,
    setSurah,
  } = useQuranSurah()

  const {
    displayTafsir,
    displayLatin,
    displayAudio,
    displayTranslate,
    setOption,
  } = useQuranSurahOption()

  const goToVerse = () => {
    const a = document.createElement('a')
    a.href = window.location.hash
    a.click()
  }

  // On page loaded
  useEffect(() => {
    setSurah(data)

    // Go to the verse
    if (window.location.hash) goToVerse()
  }, [])

  // Mengganti surah
  const changeSurah = (number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    router.push('/quran/surah/' + number)
    getSurah(number)
  }

  return (
    <Layout
      name={`Qur'an Surah ke-${data.number} - ${data.name.transliteration.id} (${data.name.translation.id})`}
    >
      {loading && <Loading message="Memuat semua ayat..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
      )}

      {surah && (
        <>
          {/* Head */}

          <div className="text-center">
            <h1 className="text-2xl font-bold font-serif mb-3">
              <span className="font-mushaf">{surah.name.short}</span>
            </h1>
            <h2 className="text-xl font-bold text-rose-500">
              {surah.name.transliteration.id}{' '}
            </h2>
            <h3 className="text-lg font-semibold">
              {surah.name.translation.id}
            </h3>
          </div>

          {/* Options */}
          <div className="flex flex-wrap justify-center py-4 bg-white text-sm sticky top-0 z-10">
            {/* Tafsir button */}
            <div
              className={`cursor-pointer duration-300 hover:text-rose-500 ${
                displayTafsir ? 'text-rose-500' : 'text-slate-500 '
              }`}
              onClick={() => setOption({ displayTafsir: !displayTafsir })}
              title="Klik untuk menampilkan tafsir surah ini."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Tafsir
            </div>

            {/* Translate button */}
            <div
              className={`cursor-pointer duration-300 hover:text-rose-500 ${
                displayTranslate ? 'text-rose-500' : 'text-slate-500 '
              }`}
              onClick={() => setOption({ displayTranslate: !displayTranslate })}
              title="Klik untuk menampilkan terjemahan masing-masing ayat."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>{' '}
              Terjemahan
            </div>

            {/* Audio button */}
            <div
              className={`cursor-pointer duration-300 hover:text-rose-500 ${
                displayAudio ? 'text-rose-500' : 'text-slate-500 '
              }`}
              onClick={() => setOption({ displayAudio: !displayAudio })}
              title="Klik untuk menampilkan audio masing-masing ayat."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>{' '}
              Audio
            </div>

            {/* Latin button */}
            <div
              className={`cursor-pointer duration-300 hover:text-rose-500 ${
                displayLatin ? 'text-rose-500' : 'text-slate-500 '
              }`}
              onClick={() => setOption({ displayLatin: !displayLatin })}
              title="Klik untuk menampilkan bacaan latin masing-masing ayat."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>{' '}
              Latin
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-between mb-5">
            {/* Previous */}
            <div className="flex items-center hover:text-rose-500 duration-300">
              {surah.number > 1 && (
                <button
                  title="Kembali ke surah sebelumnya."
                  onClick={() => changeSurah(surah.number - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>{' '}
                  Sebelumnya
                </button>
              )}
            </div>

            {/* Next */}
            <div className="flex items-center text-right hover:text-rose-500 duration-300">
              <button
                title="Beralih ke surah selanjutnya."
                onClick={() => changeSurah(surah.number + 1)}
              >
                Selanjutnya{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Verses */}
          {surah.verses.map((verse, i) => (
            <VerseCard
              key={i}
              options={{
                displayTafsir,
                displayLatin,
                displayTranslate,
                displayAudio,
                showLastReadButton: true,
                offsetOn: true,
              }}
              verse={verse}
            />
          ))}

          {/* Navigation */}
          <div className="flex justify-between mt-3">
            {/* Previous */}
            <div className="flex items-center hover:text-rose-500 duration-300">
              {surah.number > 1 && (
                <button
                  title="Kembali ke surah sebelumnya."
                  onClick={() => changeSurah(surah.number - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>{' '}
                  Sebelumnya
                </button>
              )}
            </div>

            {/* Next */}
            <div className="flex items-center text-right hover:text-rose-500 duration-300">
              <button
                title="Beralih ke surah selanjutnya."
                onClick={() => changeSurah(surah.number + 1)}
              >
                Selanjutnya{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tafsir */}
          <div
            className={`fixed inset-0 z-10 flex justify-center p-4 bg-slate-700/20 backdrop-blur duration-300 overflow-y-auto ${
              displayTafsir ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <div>
              {/* Head */}
              <div className="p-3 rounded-t-lg bg-rose-500 text-rose-50 relative">
                <div className="absolute top-0 right-0 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer hover:fill-rose-50 hover:stroke-rose-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    onClick={() => setOption({ displayTafsir: false })}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="px-3 py-2.5">
                      <h2 className="text-xl font-bold">
                        {surah.name.transliteration.id}
                      </h2>
                      <h2 className="font-semibold">
                        {surah.name.translation.id}
                      </h2>
                    </div>
                  </div>

                  <div className="text-right flex items-center">
                    <div className="px-3 pt-4">
                      <h1 className="text-2xl font-bold font-serif">
                        <span className="font-mushaf">{surah.name.short}</span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-3 rounded-b-lg bg-white">
                <p className="mb-3">
                  <strong>
                    Qur'an surah ke-{surah.number}, terdiri dari{' '}
                    {surah.numberOfVerses} ayat dan termasuk surah{' '}
                    {surah.revelation.id}.
                  </strong>
                </p>
                <p>{surah.tafsir.id}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {}
    </Layout>
  )
}

/** @type {import("next").GetServerSideProps} */
export async function getServerSideProps({ params }) {
  const surahNumber = Number(params.surah)

  // Handel surah number
  if (surahNumber < 1 || surahNumber > 114) return { notFound: true }

  // Mendapatkan data surah
  const data = await fetch(surahEndpoint + surahNumber)
    .then((res) => res.json())
    .then(({ data }) => data)

  return {
    props: {
      data,
    },
  }
}
