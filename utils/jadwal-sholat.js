const indonesianName = (name) => {
  const blacklist = ['Maghrib', 'Imsak']

  if (!blacklist.includes(name))
    switch (name) {
      case 'Fajr':
        return 'Subuh'
        break

      case 'Sunrise':
        return 'Matahari terbit (Dhuha)'
        break

      case 'Dhuhr':
        return 'Dzuhur'
        break

      case 'Asr':
        return 'Asar'
        break

      case 'Sunset':
        return 'Matahari terbenam'
        break

      case 'Isha':
        return 'Isya'
        break

      case 'Midnight':
        return 'Tengah malam (Tahajud)'
        break

      default:
        break
    }

  return name
}

const indonesianDate = (time = false, setDate = '') => {
  let date = new Date()
  if (setDate !== '') date = new Date(setDate)

  let tahun = date.getFullYear()
  let bulan = date.getMonth()
  let tanggal = date.getDate()
  let hari = date.getDay()
  let jam = (date.getHours() < 10 ? '0' : '') + date.getHours()
  let menit = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  let detik = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()

  switch (hari) {
    case 0:
      hari = 'Minggu'
      break
    case 1:
      hari = 'Senin'
      break
    case 2:
      hari = 'Selasa'
      break
    case 3:
      hari = 'Rabu'
      break
    case 4:
      hari = 'Kamis'
      break
    case 5:
      hari = "Jum'at"
      break
    case 6:
      hari = 'Sabtu'
      break

    default:
      break
  }

  switch (bulan) {
    case 0:
      bulan = 'Januari'
      break
    case 1:
      bulan = 'Februari'
      break
    case 2:
      bulan = 'Maret'
      break
    case 3:
      bulan = 'April'
      break
    case 4:
      bulan = 'Mei'
      break
    case 5:
      bulan = 'Juni'
      break
    case 6:
      bulan = 'Juli'
      break
    case 7:
      bulan = 'Agustus'
      break
    case 8:
      bulan = 'September'
      break
    case 9:
      bulan = 'Oktober'
      break
    case 10:
      bulan = 'November'
      break
    case 11:
      bulan = 'Desember'
      break
    default:
      break
  }

  if (time) return `${jam}:${menit}:${detik}`

  return `${tanggal} ${bulan} ${tahun}`
}

module.exports = {
  indonesianName,
  indonesianDate,
}
