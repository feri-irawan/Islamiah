import {useState} from 'react'

export default function BeritaCard({berita}) {
  const {link, title, pubDate, description, thumbnail} = berita
  const [img, setImg] = useState(thumbnail)

  return (
    <div className="shadow rounded-xl overflow-hidden hover:scale-105 duration-300">
      <div className="ovrflow-hidden flex justify-center items-center">
        <img
          className="w-full"
          src={img}
          alt={title}
          onError={() => setImg('https://dummyimage.com/600x400/fb7186/fff')}
        />
      </div>
      <div className="p-3">
        <h2 className="font-bold text-lg md:text-xl text-rose-400 mb-3">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className="mb-3">
          Dipublikasikan pada {new Date(pubDate).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{__html: description}} />
      </div>
    </div>
  )
}
