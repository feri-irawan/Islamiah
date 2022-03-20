import Head from 'next/head'

import Content from './Content'
import Header from './Header'
import Footer from './Footer'
import BottomNavigation from './BottomNavigation'

export default function Layout({children, name}) {
  return (
    <div className="w-full mx-auto">
      <Head>
        <title>Islamiah - {name}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Mushaf.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
      </Head>
      <main className="text-slate-600">
        <Header />
        <Content>{children}</Content>
        <Footer />
        <BottomNavigation />
      </main>
    </div>
  )
}
