import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Skeleton } from 'antd'
import { BACKEND_API } from '../server.configs'
export const IndexAdsComponent = () => {
  const [dataSource, setDataSource] = useState([])
  
  useEffect(() => {
    const test = async () => {
      const res = await fetch(BACKEND_API + '/jobspost/findAds', {
        method: 'GET'
      })
      if (res.status !== 500) {
        const data = await res.json()
        const getDataLength = data.data.length
        const cloneData = JSON.parse(JSON.stringify(data.data))
        for (let i = getDataLength; i < 9; i++) {
          cloneData.push('')
        }
        setDataSource(cloneData)
      }

    }
    test()
  }, [])

  return <div className='flex w-full mb-5 lg:pl-5 lg:pr-5 xl:pl-0 xl:pr-0'>
    <div className='w-11/12 lg:w-full sm:w-11/12  grid grid-cols-1 gap-1 lg:grid-cols-3 mx-auto xl:mx-40 shadow-sm lg:border lg:rounded-md lg:border-gray-300 pb-2.5 lg:pr-3' >
      {
        dataSource.map((d, index) => {
          if (d !== "") {
            return <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
              <div key={d._id + index} className='cursor-pointer lg:flex lg:flex-nowrap border rounded-md lg:border-0 sm:p-5 lg:pt-3.5 lg:pl-3.5 sm:mb-3.5 lg:mb-0 '>
                <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
                  <div style={{ maxHeight: 200 }} key={d.title_image + index} className='mb-2'>
                    <img alt=' หาคนโพส.com' className='findjob-title-image' key={d.title_image + index + index} src={'http://api.หาคนโพส.com/photos/default_header.jpg'} style={{ maxHeight: 200, width: '100%' }} />
                  </div>
                </Link>
                <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
                  <span style={{ maxWidth: 110 }} className='xl:w-full lg:mr-3.5 findjob-logo-image'>
                    {d.logo_image !== undefined || d.logo_image !== '' ?
                      <img alt='หาคนโพส.com' className='flex mx-auto lg:max-h-20' key={d.logo_image + index} src={d.logo_image} />
                      : <img alt='หาคนโพส.com' className='flex mx-auto lg:max-h-20' key={d.logo_image + index} src={`${BACKEND_API}/photos/default_logo.png`} />
                    }

                  </span>
                </Link>
                <div className='pl-2.5 lg:pl-0'>
                  <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id}><span>{d.post_title}</span></Link>
                  <div>
                    <span>
                      <strong>{d.work_type && d.work_type.join(', ')}</strong>
                    </span>
                    {index === 0 || index === 1 || index === 2 ? <span className='blink-text'> ด่วนมาก !!!</span> : ''}
                    <br></br>
                    <span><strong className='text-red-500'>{d.company_name}</strong></span>
                  </div>
                </div>
              </div>
            </Link>
          } else {
            return <Skeleton key={index} className='pl-3' />
          }
        })
      }
    </div>
  </div>
}
