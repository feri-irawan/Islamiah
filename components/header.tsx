import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-rose-500 p-3 flex justify-between items-center text-rose-50">
      <div>
        <Link href="/" className="text-lg font-bold">
          Islamiah
        </Link>
      </div>

      <div>{/* <button className="p-3 rounded-full">Dark</button> */}</div>
    </header>
  )
}
