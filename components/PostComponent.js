import React, { useState, useEffect } from 'react'
import { Divider } from 'antd'
import { PostApi } from '../api/PostApi'
const PostComponent = ({ id }) => {
    const [dataSource, setDataSource] = useState({
        post_title: '',
        company_name: '',
        province: '',
    })
    const [postDate, setPostDate] = useState('')

    useEffect(() => {
        if (id !== '') {
            PostApi.getPostByID(id).then(result => {
                setDataSource(result[0])
                const splitDate = result[0].createdDate.split('T')[0].split('-')
                if (splitDate[1] > 0) {
                    const date = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]).toDateString().split(' ')
                    const newDate = date[2] + ' ' + date[1] + ' ' + date[3]
                    setPostDate(newDate)
                } else {
                    const date = new Date(splitDate[0], splitDate[1], splitDate[2]).toDateString().split(' ')
                    const newDate = date[2] + ' ' + date[1] + ' ' + date[3]
                    setPostDate(newDate)
                }
            })
        }
    }, [id])

    return (
        <div >
            <div className=' mb-5'>
                <div className='box'>
                    <img alt='หาคนโพส.com' src={'http://api.หาคนโพส.com/photos/default_header.jpg'} className='w-full' style={{ maxHeight: 390 }} />
                    <div className=' p-2 flex flex-row mt-6 '>
                        <div className='left-content'>
                            <div className='px-5'>
                                <div style={{ maxWidth: 216 }}>
                                    <img alt='หาคนโพส.com' style={{ maxHeight: 80 }} src={dataSource.logo_image && dataSource.logo_image} />
                                </div>
                                <div className='mt-6'>
                                    <h1 className='text-xl'>{dataSource.post_title}</h1>
                                    <span className='text-lg'>{dataSource.company_name}</span>
                                </div>
                                <div className='text-lg pt-3'>
                                    <div>
                                        <span className='leading-normal'>{dataSource.company_tel ? 'เบอร์โทรศัพท์ : ' + dataSource.company_tel : ''}</span>
                                    </div>
                                    <div className='mt-2'>
                                        <span className='leading-normal'>{dataSource.line_id ? 'LINE ID : ' + dataSource.line_id : ''}</span>
                                    </div>
                                    <div className='mt-2'>
                                        <span className='leading-normal'>{dataSource.company_email ? 'EMAIL : ' + dataSource.company_email : ''}</span>
                                    </div>
                                    <div className='mt-2'>
                                        <span className='leading-normal'>{dataSource.company_facebook ? 'Facebook : ' + dataSource.company_facebook : ''}</span>
                                    </div>
                                    <div className='mt-2'>
                                        <span>ลงประกาศเมื่อ {postDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            {/* <div className='mt-9'>
                                <div>
                                    <Button type='primary' style={{ width: 260, height: 40 }}>Apply now</Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-12 px-6'>
                <div className='highlight'>
                    <div style={{ paddingTop: 1 }}>
                        <div>
                            <h4 className='text-lg'>ไฮไลท์เด่นของงาน</h4>
                        </div>
                    </div>
                    <div style={{ paddingTop: 1 }} className='text-base'>
                        <ul>
                            {dataSource.jobshighlights && dataSource.jobshighlights.map((data, index) => {
                                return <li key={data.highlight + index + 1}>{index + 1}. {data.highlight}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className='job-description' style={{ paddingTop: 36 }}>
                    <div style={{ paddingTop: 1 }}>
                        <div>
                            <h4 className='text-lg'>รายละเอียดงาน</h4>
                        </div>
                    </div>
                    <div style={{ paddingTop: 1 }} className='text-base'>
                        <div>
                            <h4 className='text-lg pt-5 underline'>Job Responsibilities:</h4>
                        </div>
                        <div className='pl-12 pt-5'>
                            <ul className='list-disc'>
                                {dataSource.responsibility && dataSource.responsibility.map((data, index) => {
                                    return (<li className='leading-7' key={data.responsibilityprops + index}>{data.responsibilityprops}</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                    <div style={{ paddingTop: 1 }} className='text-base'>
                        <div>
                            <h4 className='text-lg pt-5 underline'>Qualification:</h4>
                        </div>
                        <div className='pl-12 pt-5'>
                            <ul className='list-disc'>
                                {dataSource.jobproperties && dataSource.jobproperties.map((data, index) => {
                                    return (<li className='leading-7' key={data.jobprops}>{data.jobprops}</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='more-detail py-9'>
                    <div style={{ paddingTop: 1 }}>
                        <div>
                            <h4 className='text-lg'>รายละเอียดเพิ่มเติม</h4>
                        </div>
                    </div>
                    <div style={{ paddingTop: 1 }} className='text-base flex flex-wrap'>
                        <div className='sub-more-detail'>
                            <div>
                                <span className='font-bold'>ระดับการศึกษา</span>
                            </div>
                            <div>
                                <span>{dataSource.scholar_degree}</span>
                            </div>
                        </div>
                        <div className='sub-more-detail  pt-3'>
                            <div>
                                <span className='font-bold'>ประเภทการจ้างงาน</span>
                            </div>
                            <div>
                                <span>{dataSource.work_type && dataSource.work_type.join(', ')}</span>
                            </div>
                        </div>
                        <div className='sub-more-detail pt-3'>
                            <div>
                                <span className='font-bold'>ประเภทงาน</span>
                            </div>
                            <div>
                                <span>{dataSource.work_select && dataSource.work_select.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />

                <div className='more-detail py-9 mb-8'>
                    <div style={{ paddingTop: 1 }}>
                        <div>
                            <h4 className='text-lg'>ข้อมูลบริษัท</h4>
                        </div>
                    </div>
                    <div style={{ paddingTop: 1 }} className='text-base'>
                        <div className='sub-more-detail pt-5'>
                            <span className='text-gray-500'>{dataSource.company_description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


PostComponent.getInitialProps = async (context) => {
    return context
}

export default PostComponent