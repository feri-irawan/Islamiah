import Link from 'next/link'
import {useState} from 'react'

export default function SurahCard({surah}) {
  const {number, numberOfVerses, name, revelation, tafsir} = surah
  const [displayTafsir, setDisplayTafsir] = useState(false)

  return (
    <>
      {/* Card */}
      <div className="shadow rounded-lg flex w-full hover:bg-rose-50 hover:shadow-md hover:scale-105 duration-300">
        <div>
          <div className="px-2 md:px-3 lg:px-4 py-5 h-full text-2xl bg-rose-300 rounded-l-lg font-bold text-rose-50 flex justify-center items-center">
            {number}
          </div>
        </div>
        <div className="w-full">
          <Link href={`/quran/surah/${number}`}>
            <a>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="px-3 py-2.5">
                    <h2 className="text-lg md:text-xl font-bold text-rose-400">
                      {name.transliteration.id}
                    </h2>
                    <h2 className="font-semibold text-sm md:text-base">
                      {name.translation.id}
                    </h2>
                  </div>
                </div>

                <div className="text-right flex items-center">
                  <div className="px-3">
                    <h1 className="text-xl md:text-2xl font-bold font-serif">
                      <span className="font-mushaf">{name.short}</span>
                    </h1>
                  </div>
                </div>
              </div>
            </a>
          </Link>

          <div className="text-sm mt-1 flex justify-between px-3 pb-3">
            <div className="">
              {numberOfVerses} ayat, surah {revelation.id}
            </div>

            <div className="hover:text-rose-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                title="Lihat Tafsir"
                onClick={() => setDisplayTafsir(true)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
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
                onClick={() => setDisplayTafsir(false)}
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
                    {name.transliteration.id}
                  </h2>
                  <h2 className="font-semibold">{name.translation.id}</h2>
                </div>
              </div>

              <div className="text-right flex items-center">
                <div className="px-3 pt-4">
                  <h1 className="text-2xl font-bold font-serif">
                    <span className="font-mushaf">{name.short}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-3 rounded-b-lg bg-white">
            <p className="mb-3">
              <strong>
                Qur'an surah ke-{number}, terdiri dari {numberOfVerses} ayat dan
                termasuk surah {revelation.id}.
              </strong>
            </p>
            <p>{tafsir.id}</p>
          </div>
        </div>
      </div>
    </>
  )
}
