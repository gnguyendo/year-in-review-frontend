import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Layout>
      <Component key={router.asPath}{...pageProps} />
    </Layout>
  )
}