import { useState, useEffect } from 'react'
import JobInfo from '../../components/JobInfo'
import { useRouter } from 'next/router'
import { PostApi } from '../../api/PostApi'
import { Button, Divider } from 'antd'
import { workSelectedHeader } from '../../util/mockData'
import Head from 'next/head'
export default function JobPage({ pid }) {
    const [postTitle, setPostTitle] = useState('')
    const [dataSource, setDataSource] = useState({
        post_title: '',
        company_name: '',
        province: '',
    })
    const [postDate, setPostDate] = useState('')

    useEffect(() => {
        PostApi.getPostByPostID(pid).then(result => {
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
    }, [pid])
    return (
        <>
            <Head>
                <title>{dataSource.post_title}</title>
                <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:url" content="https://aks124.com/"></meta>
                <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
                <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
                <meta property="og:site_name" content="aks124.com"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container mx-auto '>
                <div className='mx-auto'>
                    <div className='jobDetailHeader mb-5'>
                        <div className='box'>
                            <img alt='SA Gaming, แทงบอลออนไลน์, บาคาร่าออนไลน์, aks124 , aks124.com' src={dataSource.title_image && dataSource.title_image[0].b64img} className='w-full' style={{ maxHeight: 390 }} />
                            <div className='jobDetailHeaderContent p-2 flex flex-row mt-6 '>
                                <div className='left-content'>
                                    <div className='px-5'>
                                        <div style={{ maxWidth: 216 }}>
                                            <img alt='SA Gaming, แทงบอลออนไลน์, บาคาร่าออนไลน์, aks124 , aks124.com' style={{ maxHeight: 80 }} src={dataSource.logo_image && dataSource.logo_image[0].b64img} />
                                        </div>
                                        <div className='mt-6'>
                                            <h1 className='text-xl'>{postTitle}</h1>
                                            <span className='text-lg'>{dataSource.company_name}</span>
                                        </div>
                                        <div className='text-lg pt-3'>
                                            <div>
                                                <span className='leading-normal'>{dataSource.province}</span>
                                            </div>
                                            <div>
                                                <span className='mt-2'>ลงประกาศเมื่อ {postDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='right-content'>
                                    <div className='job-apply mt-9'>
                                        <div>
                                            <Button type='primary' className='job-apply-btn' style={{ height: 40 }}>Apply now</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='jobDetailContainer py-12 px-6'>
                        <div className='highlight'>
                            <div style={{ paddingTop: 1 }}>
                                <div>
                                    <h4 className='text-lg'>ไฮไลท์เด่นของงาน</h4>
                                </div>
                            </div>
                            <div style={{ paddingTop: 1 }} className='text-base'>
                                <ul key='highlights-list'>
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
                                    <ul className='list-disc' key='resposibility-list'>
                                        {dataSource.responsibility && dataSource.responsibility.map((data, index) => {
                                            return (<li className='leading-7' key={data.responsibilityprops}>{data.responsibilityprops}</li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div style={{ paddingTop: 1 }} className='text-base'>
                                <div>
                                    <h4 className='text-lg pt-5 underline'>Qualification:</h4>
                                </div>
                                <div className='pl-12 pt-5'>
                                    <ul className='list-disc' key='property-list'>
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
                                        <span className='font-bold'>ระดับตำแหน่งงาน</span>
                                    </div>
                                    <div>
                                        <span>{dataSource.job_position}</span>
                                    </div>
                                </div>
                                <div className='sub-more-detail  pt-3'>
                                    <div>
                                        <span className='font-bold'>ระดับการศึกษา</span>
                                    </div>
                                    <div>
                                        <span>{dataSource.scholar_degree}</span>
                                    </div>
                                </div>
                                <div className='sub-more-detail pt-3'>
                                    <div>
                                        <span className='font-bold'>อายุงาน</span>
                                    </div>
                                    <div>
                                        <span>{dataSource.work_experience}</span>
                                    </div>
                                </div>
                                <div className='sub-more-detail pt-3'>
                                    <div>
                                        <span className='font-bold'>ประเภทการจ้างงาน</span>
                                    </div>
                                    <div>
                                        {dataSource.work_type && dataSource.work_type.map(data => {
                                            return <span key={data}>{data}</span>
                                        })}
                                    </div>
                                </div>
                                <div className='sub-more-detail pt-3'>
                                    <div>
                                        <span className='font-bold'>เว็บไซต์บริษัท</span>
                                    </div>
                                    <div>
                                        <span>{dataSource.job_position}</span>
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

                        <div className='more-detail py-9'>
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
            </div>
        </>
    )
}
export const getServerSideProps = async ({ params }) => {
    const pid = params.post_id;
    return {
        props: { pid }
    }
}