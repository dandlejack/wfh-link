import '../styles/globals.css'
import '../styles/header.css'
import '../styles/newpost.css'
import "../styles/tailwind-style.css";
import 'antd/dist/antd.css';
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(()=>import('../components/header/header').then(mod=>mod.Header))
const DynamicFooter = dynamic(()=>import('../components/footer').then(mod=>mod.Footer))

function MyApp({ Component, pageProps }) {
  return <>
  <DynamicHeader />
    <Component {...pageProps} />
  <DynamicFooter/>
  </>
}

export default MyApp
