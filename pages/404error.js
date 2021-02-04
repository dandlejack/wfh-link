import {Result} from 'antd'
import Head from 'next/head'
export default function Error404(){
    return <div className='container mx-auto h-screen relative bg-white'>
      <Head>
            <title>404 Not Found</title>
            <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
            <meta property="og:url" content="https://aks124.com/"></meta>
            <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
            <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
            <meta property="og:site_name" content="aks124.com"></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Result
    status="500"
    title="404"
    subTitle="เกิดปัญหาระบบขัดข้อง กำลังแก้ไข"    
  />
    </div>
}
export async function getStaticProps(context) {
  return {
      props:{}
  }
}