import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Skeleton } from 'antd'
import { BACKEND_API } from '../server.configs'
export const IndexAdsComponent = () => {
  const [dataSource, setDataSource] = useState([])

  // const [userRole, setUserRole] = useState('')
  // useEffect(() => {
  //   const getCookieData = Cookie.get('token')
  //   if (getCookieData !== undefined) {
  //     const jwtData = jwt_decode(getCookieData)
  //     setUserRole(jwtData.role)
  //   }
  // }, [])

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

  return <div className='flex w-full mb-5'>
    <div className='w-11/12 lg:w-full sm:w-11/12 md:w-2/3 grid grid-cols-1 gap-1 lg:grid-cols-3 mx-auto lg:mx-40 shadow-sm lg:border lg:rounded-md border-gray-300 pb-2.5 lg:pr-3' >
      {
        dataSource.map((d, index) => {
          if (d !== "") {
            return <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}><div key={d._id + index} className='cursor-pointer lg:flex lg:flex-nowrap border rounded-md lg:border-0 sm:p-5 lg:pt-3.5 lg:pl-3.5 sm:mb-3.5 lg:mb-0 '>
              <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
                <div style={{ maxHeight: 200 }} className='mb-2'>
                  <img alt=' หาคนโพส.com' className='findjob-title-image' src={d.title_image} style={{ maxHeight: 200, width: '100%' }} />
                </div>
              </Link>
              <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id + 'img'}>
                <span style={{ maxWidth: 110, width: "100%" }} className='lg:mr-3.5 findjob-logo-image'>
                  {d.logo_image !== undefined || d.logo_image !== '' ?
                  <img alt='หาคนโพส.com' className='flex mx-auto lg:max-h-20' src={d.logo_image} />
                  :<img alt='หาคนโพส.com' className='flex mx-auto lg:max-h-20' src='http://localhost:4000/photos/default_logo.png' />
                  }
                  
                </span>
              </Link>
              <div className='pl-2.5 lg:pl-0'>
                <Link href={'/job/[post_id]'} as={`/job/${d.post_id}`} key={d.post_id}><span>{d.post_title}</span></Link>
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
            </Link>
          } else {
            return <Skeleton className='pl-3' />
          }
        })
      }
    </div>
  </div>
}
