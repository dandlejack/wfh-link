import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { rangeOfJobs, workSelectedHeader, showAdsInIndex, workSelectedHeaderWithoutAll } from '../util/mockData'
import { TreeSelect, Form, Input, Carousel } from 'antd'
import { SearchOutlined, HomeOutlined } from '@ant-design/icons';
import { BACKEND_API } from '../server.configs'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import MarqueeComponent from '../components/MarqueeComponent'
import { LineAdsIndex } from '../components/LineAdsIndex'
import CarouselComponent from '../components/CarouselComponent'
const banner = `${BACKEND_API}/photos/index_banner.jpg`
const ads = `${BACKEND_API}/photos/advertiser_1.gif`
const DynamicAds = dynamic(() => import('../components/IndexAdsComponent').then(mod => mod.IndexAdsComponent), {
  ssr: false
})
const Index = ({ queryData, latestMarquee, maxMarquee }) => {
  const [dailyTopTen, setDailyTopTen] = useState([])
  const [maxTopTen, setMaxTopTen] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [selectProvinceValue, setSelectProvinceValue] = useState([])
  const [displayWidth, setDisplayWidth] = useState(1024)
  const { SHOW_PARENT } = TreeSelect
  const [form] = Form.useForm();
  const router = useRouter()

  useEffect(() => {
    setDisplayWidth(window.screen.width)
    document.body.style.overflowY = 'scroll'
  }, [])

  useEffect(() => {
    if (maxMarquee !== null) {
      const getDataLength = maxMarquee.length
      if (getDataLength > 0) {
        const pushKey = {
          list_data: maxMarquee
        }
        setMaxTopTen(pushKey)
      }
    } else {
      router.push('/404')
    }
  }, [maxMarquee])

  useEffect(() => {
    if (latestMarquee !== null) {
      const getDataLength = latestMarquee.length
      if (getDataLength > 0) {
        setDailyTopTen(latestMarquee[0])
      }
    } else {
      router.push('/404')
    }
  }, [latestMarquee])

  const onFinish = (e) => {
    if (e.company_name === undefined) {
      e.company_name = ''
    }
    if (e.company_name !== '') {
      Router.push({
        pathname: `/search/${e.company_name}`,
      })
    } else if (e.province !== 'ระยะเวลารับงานทั้งหมด' && e.work_select === 'ประเภทงานทั้งหมด') {
      Router.push({
        pathname: `/search/FindJobs/job-location/${e.province}`,
      })
    } else {
      Router.push({
        pathname: '/search/FindJobs',
        query: { place: e.province, worksType: e.work_select }
      })
    }
  }

  const handleTreeSelect = value => {
    const checkValueIndex = value.findIndex(val => val === 'ประเภทงานทั้งหมด')
    if (value[value.length - 1] === 'ประเภทงานทั้งหมด') {
      if (value.length > 1) {
        value[0] = 'ประเภทงานทั้งหมด'
        value.splice(1, value.length)
      }
    } else {
      if (checkValueIndex > -1)
        value.splice(checkValueIndex, 1)
    }
    setSelectValue(value)
  }

  const handleProvinceTreeSelect = value => {
    const checkValueIndex = value.findIndex(val => val === 'ระยะเวลารับงานทั้งหมด')
    if (value[value.length - 1] === 'ระยะเวลารับงานทั้งหมด') {
      if (value.length > 1) {
        value[0] = 'ระยะเวลารับงานทั้งหมด'
        value.splice(1, value.length)
      }
    } else {
      if (checkValueIndex > -1)
        value.splice(checkValueIndex, 1)
    }
    setSelectProvinceValue(value)
  }
  return (
    <div className={'container mx-auto'}>
      <Head>
        <title>หาคนโพส.com</title>
        <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
        <meta property="og:url" content="https://หาคนโพส.com/"></meta>
        <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
        <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
        <meta property="og:site_name" content="หาคนโพส.com"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className='flex w-full'>
          <div className='block lg:pl-5 lg:pr-5 xl:pl-0 xl:pr-0 xl:mx-40 w-full my-0 mx-auto rounded-sm '>
            <div className='block lg:flex w-full justify-center'>
              <img src={banner} className='lg:w-full' />
            </div>
          </div>
        </div>
        <div className='flex w-full mb-5 xl:max-h-14 xl:h-14 lg:pl-5 lg:pr-5 xl:pl-0 xl:pr-0' >
          <div className='block bg-blue-600 xl:mx-40 w-full my-0 mx-auto px-5 pb-4 rounded-sm '> {/*max-w-screen-xl*/}
            <div className='block lg:flex w-full justify-center mt-1'>
              <Form
                layout="inline"
                form={form}
                name="findads"
                onFinish={onFinish}
                initialValues={{
                  province: rangeOfJobs[0].value,
                  work_select: workSelectedHeader[0].value,
                }}
                className='w-full xl:justify-center'
                scrollToFirstError
              >
                <Form.Item
                  name='province'
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full  xl:w-3/12 xl:ml-0 _mRs'
                >
                  <TreeSelect
                    showArrow
                    showCheckedStrategy={SHOW_PARENT}
                    value={selectProvinceValue}
                    treeCheckable={true}
                    treeData={rangeOfJobs}
                    onChange={e => handleProvinceTreeSelect(e)}
                    maxTagPlaceholder={`+ ${selectProvinceValue.length - 2} Selected`}
                    maxTagCount={2}
                    treeIcon={<HomeOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name='work_select'
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full xl:w-3/12  xl:ml-0 treeselect-index _mRs'
                >
                  <TreeSelect
                    showArrow
                    showCheckedStrategy={SHOW_PARENT}
                    value={selectValue}
                    treeCheckable={true}
                    treeData={workSelectedHeader}
                    onChange={e => handleTreeSelect(e)}
                    maxTagPlaceholder={`+ ${selectValue.length - 2} Selected`}
                    maxTagCount={2}
                  />
                </Form.Item>
                <div className='flex w-full justify-center sm:justify-center sm:w-full lg:w-full lg:inline-block xl:w-36 xl:mt-2'>
                  <button type="submit" className="w-full lg:w-full lg:h-9 group relative justify-center py-2 px-4 xl:ml-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
                    หางาน
                </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className='flex w-full max-h-56'>
          <div className='flex w-11/12 lg:w-full sm:w-11/12 mx-auto  pb-2.5 xl:pr-3 lg:pl-5 lg:pr-5 xl:px-40'>
            <CarouselComponent />
            <div >
              <iframe className='show-video'src="https://www.youtube.com/embed/tgbNymZ7vqY">
              </iframe>
            </div>
          </div>

        </div>
        <DynamicAds />
        <div className='flex w-full flex-wrap flex-col lg:flex-row mb-5 lg:pl-5 lg:pr-5 xl:px-40 '>
          <MarqueeComponent data={maxTopTen} title={'ยินดีต้องรับสมาชิกใหม่'} consstyle='lg:mr-5 sm:mb-5 mx-5 lg:mx-0 lg:mb-0 bg-green-600' contentStyle='bg-green-400'/>
          <MarqueeComponent data={dailyTopTen} title={'10บริษัทที่เปิดรับสมัครพนักงาน'} consstyle=' mx-5 lg:mx-0 bg-red-600'contentStyle='bg-red-400' />
        </div>
        {/* <div className='flex w-full flex-wrap flex-col lg:flex-row mb-5 lg:px-40 '>
          <MarqueeComponent data={['test', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10']} title={'ประกาศรายชื่อผู้ได้รับรางวัลคนโพสดีเด่นประจำวันนี้'} consstyle=' mx-5 lg:mx-0' />
        </div> */}
        {/* <div className='flex w-full'>
          <div className='block lg:mx-40 w-full my-0 mx-auto pb-5 rounded-sm '>
            <div className='block lg:flex w-full justify-center'>
              <img src={socialLogo} className='lg:w-full' />
            </div>
          </div>
        </div> */}
        <div className='flex sm:w-full'>
          {/* <div className='cont-left sm:w-full sm:mx-5 sm:mb-5 lg:float-left lg:w-6/12 lg:ml-40 lg:mr-5'> */}
          <div className='cont-left sm:w-full sm:mx-5 sm:mb-5 lg:float-left lg:w-full xl:mx-40 '>
            <div className='box-cont border rounded-sm'>
              <div className='box-header p-1 pl-5 text-white' style={{ background: 'linear-gradient(to bottom, rgba(29, 78, 216,1) 0%,rgba(37, 99, 235,1) 50%, rgba(29, 78, 216,1) 100%)' }}>
                <span className='text-lg'>งานตามสายอาชีพ</span>
              </div>
              <div className='box-info p-5 flex flex-wrap text-base '>
                {workSelectedHeaderWithoutAll.map((data, index) => {
                  if (index % 2 === 0) {
                    return <Link href={`/search/FindJobs?place=ระยะเวลารับงานทั้งหมด&worksType=${data.value}`} key={data.value} ><div className='mr-1 mb-1 w-6/12 '><a>{data.value}</a></div></Link>
                  } else {
                    return <Link href={`/search/FindJobs?place=ระยะเวลารับงานทั้งหมด&worksType=${data.value}`} key={data.value} ><div className='mr-1 mb-1 w-5/12 '><a>{data.value}</a></div></Link>
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <a href={'https://line.me/ti/p/%40Richpostit'} target='_blank'>
          <div className='homepage-ads w-full h-64 mb-5 xl:max-w-screen-md lg:pl-5 lg:pr-5 xl:pl-0 xl:pr-0 '>
            <img src={ads} />
          </div>
        </a>

        {displayWidth >= 1024 ? <LineAdsIndex />:<></>}
      </main>
      {/* <footer className={styles.footer}>

      </footer> */}
    </div>
  )
}

export async function getStaticProps(context) {
  try {
    const lastest = await fetch(BACKEND_API + '/topten/findlastest', {
      method: 'GET'
    })
    const foundMax = await fetch(BACKEND_API + '/topten/findMaxValue', {
      method: 'GET'
    })
    const data = await lastest.json()
    const data2 = await foundMax.json()
    return {
      props: {
        latestMarquee: data,
        maxMarquee: data2
      }
    }
  } catch (error) {
    return {
      props: {
        latestMarquee: null,
        maxMarquee: null
      }
    }
  }
}


export default Index

