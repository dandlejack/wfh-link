import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { provinceTreeData, workSelectedHeader } from '../util/mockData'
import { TreeSelect, Form, Input, Skeleton } from 'antd'
import { SearchOutlined, HomeOutlined } from '@ant-design/icons';
import { BACKEND_API } from '../server.configs'
import { useRouter } from 'next/router'

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
          <div className='block bg-green-700 lg:mx-40 w-full my-0 mx-auto pt-5 px-5 pb-5 rounded-sm '> {/*max-w-screen-xl*/}
            <h1 className='text-white text-lg font-medium text-center'>ค้นหางานที่คุณต้องการ</h1>
            {/* <div className='block lg:flex lg:flex-wrap lg:justify-center w-full'>
              <a className='w-full lg:w-5/12 float-left text-white border rounded-md p-3 mr-2 mb-2 hover:text-white hover:underline'>ค้นหาจากสถานีรถไฟฟ้า</a>
              <a className='w-full lg:w-5/12 float-left text-white border rounded-md p-3 mr-2 mb-2 hover:text-white hover:underline'>ค้นหาจากสถานศึกษา</a>
              <a className='w-full lg:w-5/12 float-left text-white border rounded-md p-3 mr-2 mb-2 hover:text-white hover:underline'>ค้นตามจังหวัด</a>
              <a className='w-full lg:w-5/12 float-left text-white border rounded-md p-3 mr-2 mb-2 hover:text-white hover:underline'>ค้นหาจากแผนที่</a>
            </div> */}
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
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full xl:w-3/12  '
                >
                  <Input placeholder='ระบุคำที่ต้องการค้นหา' prefix={<SearchOutlined />} />
                </Form.Item>
                <Form.Item
                  name='province'
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full  xl:w-3/12'
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
                  className='w-full mb-2 py-2 rounded-sm mr-1 sm:w-full sm:mx-auto lg:w-full  xl:w-3/12 treeselect-index'
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
                  <button type="submit" className="w-full lg:w-full lg:h-9 group relative justify-center py-2 px-4 xl:ml-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
                    หางาน
                </button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <div className='flex w-full mb-5'>
          <div className='w-2/3 lg:w-full sm:w-2/3 md:w-2/3 grid grid-cols-1 gap-1 lg:grid-cols-3 mx-auto lg:mx-40 shadow-sm lg:border lg:rounded-md border-gray-300 pb-2.5 lg:pr-3' >
            {
              adsData.map((d, index) => {
                if (d !== "") {
                  return <div key={d._id + index} className='lg:flex lg:flex-nowrap border rounded-md lg:border-0 sm:p-3.5 lg:pt-3.5 lg:pl-3.5 sm:mb-3.5 lg:mb-0 '>
                    <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
                      <div style={{ maxHeight: 200 }} className='mb-2'>
                        <img  alt='SA Gaming, แทงบอลออนไลน์, บาคาร่าออนไลน์, aks124 , aks124.com' className='findjob-title-image' src={d.title_image[0].b64img} style={{ maxHeight: 200, width: '100%' }} />
                      </div>
                    </Link>
                    <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
                      <a style={{ maxWidth: 110, width: "100%" }} className='lg:mr-3.5 findjob-logo-image'><img alt='แทงบอลออนไลน์, บาคาร่าออนไลน์, aks124 , aks124.com'  className='flex mx-auto lg:max-h-20' src={d.logo_image[0].b64img} /></a>
                    </Link>
                    <div>
                      <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id}><a>{d.post_title}</a></Link>
                      {/* <div style={{ marginBottom: 5 }}>
                      <ul key='ads-list'>
                        {d.jobshighlights.map((highlightData, index2) => {
                          return (
                            <li id={d._id + index2} key={d._id + index2}>
                              <div className='flex'>
                                <div style={{ height: 20, marginTop: 9, marginRight: 10 }}>
                                  <div style={{ backgroundColor: '#1c1c1c', width: 4, height: 4, borderRadius: '50%' }}></div>
                                </div>
                                <div>{highlightData.highlight}</div>
                              </div>
                            </li>)
                        })}
                      </ul>
                    </div> */}
                      <div>
                        <span><strong>{d.work_type && d.work_type.join(', ')}</strong></span><br></br>

                        <span><strong className='text-red-500'>{d.company_name}</strong></span>
                      </div>
                    </div>
                  </div>
                } else {
                  return <Skeleton />
                }
              })
            }
          </div>
        </div>
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
          {/* <div className='cont-right sm:hidden lg:block lg:float-right lg:w-3/12 '>
            <span>
              รวมข้อมูลอพาร์ทเม้นท์ หอพัก ทั้งแบบ ห้องพักรายเดือน และห้องพักรายวัน จากทั่วประเทศ พร้อมระบบค้นหาที่พักเพื่อให้คุณสามารถค้นหาที่พักที่ตรงใจได้สะดวก เรามีข้อมูลที่พักหลายประเภทเช่น หอพัก อพาร์ทเม้นท์ หอพักหญิง-ชาย บ้านเช่า คอนโด รีสอร์ท แสดงในรูปแบบที่ค้นหาง่าย พร้อมแผนที่แสดงตำแหน่งหอพัก อพาร์ทเม้นท์ เพื่อสามารถเปรียบเทียบระยะทางได้อย่างสะดวก

              ด้วยระบบค้นหาสถานที่ปลายทาง คุณสามารถค้นหาหอพัก อพาร์ทเม้นท์ ด้วยการระบุชื่อ มหาวิทยาลัย, สถานที่ท่องเที่ยว, สถานที่ราชการ, ถนน และอื่นๆ เพื่อค้นหาหอพัก อพาร์มเม้นท์ บริเวณนั้น พร้อมแสดงข้อมูลราคา สิ่งอำนวยความสะดวก และพิกัดแผนที่สำหรับนำทางด้วย GPS ได้อย่างครบครัน และเรายังมีระบบ Filtter เพื่อให้คุณสามารถกรองผลการค้นหา หอพัก อพาร์ทเม้นท์ ตามประเภท ราคาถูก สิ่งอำนวยความสะดวก ประเภทการเช่า ห้องพักรายเดือน หรือ ห้องพักรายเดือน

              หากท่านพบปัญหาหรือต้องการแนะนำสามารถแนะนำมาได้ที่ hongpakth@gmail.com
            </span>
            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h3>Documentation &rarr;</h3>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h3>Learn &rarr;</h3>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className={styles.card}
              >
                <h3>Examples &rarr;</h3>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h3>Deploy &rarr;</h3>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
              </a>
            </div>
          </div> */}

        </div>
        <div className='homepage-ads w-full h-64 mb-5 xl:max-w-screen-md bg-gray-300'>

        </div>




      </main>

      {/* <footer className={styles.footer}>

      </footer> */}
    </div>
  )
}

Index.getInitialProps = async function () {
  try {
    const res = await fetch(BACKEND_API + '/jobspost/findAds', {
      method: 'GET'
    })
    const data = await res.json()
    return {
      queryData: data
    }
  } catch (error) {
    return {
      queryData: null
    }
  }

}


export default Index

