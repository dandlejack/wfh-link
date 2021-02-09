import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { provinceTreeData, workSelectedHeader } from '../util/mockData'
import { TreeSelect, Form, Input } from 'antd'
import { SearchOutlined, HomeOutlined } from '@ant-design/icons';
import { BACKEND_API } from '../server.configs'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicAds = dynamic(() => import('../components/IndexAdsComponent').then(mod => mod.IndexAdsComponent), {
  ssr: false
})
const Index = ({ queryData }) => {

  const [adsData, setAdsData] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [selectProvinceValue, setSelectProvinceValue] = useState([])
  const { SHOW_PARENT } = TreeSelect
  const [form] = Form.useForm();
  const router = useRouter()
  useEffect(() => {
    if (queryData !== null) {
      const getDataLength = queryData.data.length
      if (queryData.data.length < 9) {
        const cloneData = JSON.parse(JSON.stringify(queryData.data))
        for (let i = getDataLength; i < 9; i++) {
          cloneData.push('')
        }
        setAdsData(cloneData)
      } else {
        setAdsData(queryData.data)
      }
    } else {
      router.push('/404error')
    }
  }, [queryData])

  const onFinish = (e) => {

    if (e.company_name === undefined) {
      e.company_name = ''
    }
    if (e.company_name !== '') {
      Router.push({
        pathname: `/search/${e.company_name}`,
      })
    } else if (e.province !== 'สถานที่ทำงานทั้งหมด' && e.work_select === 'ประเภทงานทั้งหมด') {
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
    const checkValueIndex = value.findIndex(val => val === 'สถานที่ทำงานทั้งหมด')
    if (value[value.length - 1] === 'สถานที่ทำงานทั้งหมด') {
      if (value.length > 1) {
        value[0] = 'สถานที่ทำงานทั้งหมด'
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
        <title>WFHJOBS</title>
        <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:url" content="https://aks124.com/"></meta>
        <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
        <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:site_name" content="aks124.com"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className='flex w-full my-5 ' style={{ minHeight: 130 }}>
          <div className='block bg-blue-600 lg:mx-40 w-full my-0 mx-auto pt-5 px-5 pb-5 rounded-sm '> {/*max-w-screen-xl*/}
            <h1 className='text-white text-lg font-medium text-center'>ค้นหางานที่คุณต้องการ</h1>
            <div className='block lg:flex w-full justify-center'>
              <Form
                layout="inline"
                form={form}
                name="findads"
                onFinish={onFinish}
                initialValues={{
                  province: provinceTreeData[0].value,
                  work_select: workSelectedHeader[0].value,
                }}
                className='w-full xl:justify-center'
                scrollToFirstError
              >
                <Form.Item
                  name='company_name'
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full xl:w-3/12 _mRs'
                >
                  <Input placeholder='ระบุคำที่ต้องการค้นหา' prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item
                  name='province'
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full  xl:w-3/12 _mRs'
                >
                  <TreeSelect
                    showArrow
                    showCheckedStrategy={SHOW_PARENT}
                    value={selectProvinceValue}
                    treeCheckable={true}
                    treeData={provinceTreeData}
                    onChange={e => handleProvinceTreeSelect(e)}
                    maxTagPlaceholder={`+ ${selectProvinceValue.length - 2} Selected`}
                    maxTagCount={2}
                    treeIcon={<HomeOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name='work_select'
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full  xl:w-3/12 treeselect-index _mRs'
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
                <div className='flex w-full justify-center sm:justify-center sm:w-full lg:w-full lg:inline-block xl:w-36'>
                  <button type="submit" className="w-full lg:w-full lg:h-9 group relative justify-center py-2 px-4 xl:ml-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
                    หางาน
                </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <DynamicAds/>
        <div className='flex sm:w-full'>
          {/* <div className='cont-left sm:w-full sm:mx-5 sm:mb-5 lg:float-left lg:w-6/12 lg:ml-40 lg:mr-5'> */}
          <div className='cont-left sm:w-full sm:mx-5 sm:mb-5 lg:float-left lg:w-full lg:mx-40 '>
            <div className='box-cont border rounded-sm'>
              <div className='box-header p-1 pl-5' style={{ background: 'linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%)' }}>
                <span className='text-lg'>งานตามสายอาชีพ</span>
              </div>
              <div className='box-info p-5 flex flex-wrap text-base '>
                {workSelectedHeader.map((data, index) => {
                  if (index % 2 === 0) {
                    return <Link href={`/search/FindJobs?place=สถานที่ทำงานทั้งหมด&worksType=${data.value}`} key={data.value} ><div className='mr-1 mb-1 w-6/12 '><a>{data.value}</a></div></Link>
                  } else {
                    return <Link href={`/search/FindJobs?place=สถานที่ทำงานทั้งหมด&worksType=${data.value}`} key={data.value} ><div className='mr-1 mb-1 w-5/12 '><a>{data.value}</a></div></Link>
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='homepage-ads w-full h-64 mb-5 xl:max-w-screen-md bg-gray-300'>

        </div>




      </main>

      {/* <footer className={styles.footer}>

      </footer> */}
    </div>
  )
}

// Index.getInitialProps = async function () {
//   try {
//     const res = await fetch(BACKEND_API + '/jobspost/findAds', {
//       method: 'GET'
//     })
//     const data = await res.json()
//     return {
//       queryData: data
//     }
//   } catch (error) {
//     return {
//       queryData: null
//     }
//   }
// }

export async function getStaticProps(context) {
  try {
    const res = await fetch(BACKEND_API + '/jobspost/findAds', {
      method: 'GET'
    })
    const data = await res.json()
    return {
      props:{
        queryData: data
      }
    }
  } catch (error) {
    return {
      props:{
        queryData: null
      }
    }
  }
}


export default Index

