import {Result} from 'antd'
import Head from 'next/head'
export default function Error404(){
    return <div className='container mx-auto h-screen relative bg-white'>
      <Head>
            <title>404 Not Found</title>
            <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta property="og:url" content="https://หาคนโพส.com/"></meta>
            <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
            <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta property="og:site_name" content="หาคนโพส.com"></meta>
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