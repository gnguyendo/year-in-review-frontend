import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

function App({Component, pageProps} :AppProps ) {
  return (
    //<Layout>
    <Component {...pageProps}/>
    //</Layout>
  )
}

export default App;