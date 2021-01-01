import './vendor.scss'
import './styles.scss'
// import Navbar from './core/navbar'
import Navbar from './core/navbar-with-links'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="vendor/animate.css" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div style={{ paddingTop: '47px' }}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
