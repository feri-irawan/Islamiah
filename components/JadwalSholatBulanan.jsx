import axios from "axios";
import { useEffect, useState } from "react";
import JadwalSholatCard from "./JadwalSholatCard";

export default function JadwalSolatHariIni() {
  let today = new Date();
  const query = new URLSearchParams({
    latitude: -5.432785335037951,
    longitude: 120.20395726642634,
    // method: 99,
    month: today.getMonth() + 1,
    year: today.getFullYear()
  });

  const apiUrl = `https://api.aladhan.com/v1/calendar?${query}`;

  console.log(apiUrl);

  const [data, setData] = useState(null);
  useEffect(() => {
    // Fetch data
    if (data === null) {
      axios
        .get(apiUrl)
        // Jika sukses fetch data
        .then(({ data }) => data)
        .then(({ data }) => {
          // Memformat tanggal
          const dd = String(today.getDate()).padStart(2, "0");
          const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          const yyyy = today.getFullYear();

          today = dd + "-" + mm + "-" + yyyy;

          // Memfilter data yang tanggalnya sama dengan hari ini
          const newData = data.filter(
            ({ date }) => date.gregorian.date === today
          )[0];

          // Memperbarui data awal (null) menjadi data jadwal sholat
          setData(data);
        })
        // Jika error fetch data
        .catch(setData({ error: true }));
    }
  }, [data]);

  console.log(data);

  return (
    <div className="font-mono">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae maxime iure
      dolorem unde animi aperiam dicta consequuntur quae porro. Dolorum soluta
      neque odio ullam tempora architecto molestiae reprehenderit, velit unde.
      {/* {data
        ? data.timings &&
          Object.keys(data.timings).map((key, index) => (
            <JadwalSholatCard
              sholat={{
                name: key,
                time: data.timings[key]
              }}
            />
          ))
        : ""} */}
    </div>
  );
}
