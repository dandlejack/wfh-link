import '../styles/globals.css'
import '../styles/header.css'
import '../styles/newpost.css'
import "../styles/tailwind-style.css";
import 'antd/dist/antd.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header/header';
import dynamic from 'next/dynamic'
// export const DynamicHeader = dynamic( () => import('../components/header/header') )
// const DynamicFooter = dynamic(()=>import('../components/footer'))
function MyApp({ Component, pageProps }) {
  return <>
  <Header />
    <Component {...pageProps} />
  <Footer/>
  </>
}

export default MyApp
