import { useEffect } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Configurar o OneSignal
    const OneSignal = window.OneSignal || []
    OneSignal.push(function () {
      OneSignal.init({
        appId: 'fef4bca8-b29c-43b2-8587-4447f7dbc98b'
        // Outras configurações, se necessário
      })
    })

    return () => {
      // Limpar ou desinscrever eventos, se necessário
    }
  }, [])

  return (
    <>
      <Head>
        <title>Pratique em Casa</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
