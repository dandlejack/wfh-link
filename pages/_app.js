import '../styles/globals.css'
import '../styles/header.css'
import '../styles/newpost.css'
import "../styles/tailwind-style.css";
import 'antd/dist/antd.css';
import {Header} from '../components/header/header'
import { Footer } from '../components/footer';

function MyApp({ Component, pageProps }) {
  return <>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>
}

export default MyApp
