import {Loader} from '@googlemaps/js-api-loader'
import {useState, useEffect, useRef} from 'react'
import {coords} from '../constants/location'

export default function Tracker({callback}) {
  const googleMap = useRef(null)
  const autoTrackButton = useRef(null)
  const [coordinates, setCoordinates] = useState({
    default: true,
    lat: coords.lat,
    lng: coords.lng,
  })

  useEffect(() => {
    // Mengaktifkan izin geo lokasi
    if (coordinates.default === true)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates)
      } else {
        console.log('Geolocation tidak didukung oleh browser ini.')
      }

    // Jika tombol auto track diklik
    autoTrackButton.current.onclick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates)
      } else {
        console.log('Geolocation tidak didukung oleh browser ini.')
      }
    }

    // Callback
    if (coordinates !== null)
      callback({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      })

    // Google map loader
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
      version: 'weekly',
    })

    let map
    loader.load().then(() => {
      const google = window.google
      map = new google.maps.Map(googleMap.current, {
        center: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        zoom: 14,
      })

      new google.maps.Marker({
        map,
        position: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        title: JSON.stringify({
          lat: coordinates.lat,
          lng: coordinates.lng,
        }),
      })

      // Jika map diklik maka perbarui coordinates
      map.addListener('click', (e) => {
        const {lat, lng} = e.latLng
        setCoordinates({default: false, lat: lat(), lng: lng()})

        localStorage.setItem(
          'coords',
          JSON.stringify({default: false, lat: lat(), lng: lng()})
        )
      })
    })
  }, [coordinates])

  // Mendapatkan coordinate
  const getCoordinates = (position) => {
    const {latitude, longitude} = position.coords
    setCoordinates({default: false, lat: latitude, lng: longitude})

    localStorage.setItem(
      'coords',
      JSON.stringify({default: false, lat: latitude, lng: longitude})
    )
  }

  return (
    <>
      <button
        ref={autoTrackButton}
        className="px-3 py-2 mt-3 rounded-lg bg-rose-500 text-rose-50"
      >
        Lacak otomatis
      </button>

      <div className="overflow-hidden my-3 rounded-lg">
        <div className="h-96" ref={googleMap} />
      </div>
    </>
  )
}
