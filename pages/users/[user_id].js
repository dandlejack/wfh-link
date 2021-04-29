import { useState, useEffect } from 'react'
import { UserApi } from '../../api/UserApi'
import { Divider, Table } from 'antd'
import Head from 'next/head'
import { BACKEND_API } from '../../server.configs'
import { data } from 'autoprefixer'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';
import { PostApi } from '../../api/PostApi'
import { mypostsTable } from '../../util/mockData'
const defaultBannerImage = `${BACKEND_API}/photos/default_header.jpg`
export default function JobPageID({ query }) {
    const [dataSource, setDataSource] = useState({
        firstname: '',
        lastname: '',
        email: '',
        clickRefCounter:0,
        totalClickRefCounter:0
    })
    const [tableData, setTableData] = useState([])
    const [borderTable, setBorderTable] = useState(
        {
            canScroll: true,
            scrollWidth: {
                x: 'calc(700px + 50%)',
                y: 'auto'
            }
        }
    )
    useEffect(() => {
        const getCookie = Cookie.get("token")
        if (getCookie !== undefined) {
            const jwtDecoded = jwt_decode(getCookie);
            const parseJwtDecoded = JSON.parse(JSON.stringify(jwtDecoded));
            UserApi.findUserByID(query.user_id)
                .then(res => {
                    setDataSource(res)
                    return res
                })
            
            PostApi.getPostByUserID({ filterObject: { user_id: query.user_id } })
                .then(res => {
                    setTableData(res.data)
                })
        }else{
            window.location.replace('/')
        }
    }, [query])

    return (
        <>
            <Head>
                <title>หาคนโพส</title>
                <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
                <meta property="og:url" content="https://หาคนโพส.com/"></meta>
                <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
                <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
                <meta property="og:site_name" content="หาคนโพส.com"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container mx-auto '>
                <div className='mx-auto'>
                    <div className='jobDetailHeader mb-5'>
                        <div className='box'>
                            <img alt=' หาคนโพส.com' src={defaultBannerImage} className='w-full max-h-sm' />
                        </div>
                    </div>
                    <div className='jobDetailContainer py-12 px-6'>
                        <div className='highlight'>
                            <div style={{ paddingTop: 1 }}>
                                <div>
                                    <h4 className='text-lg'>ชื่อ-สกุล :  {dataSource && dataSource.firstname + ' ' + dataSource.lastname}</h4>
                                </div>
                            </div>
                            <div style={{ paddingTop: 1 }} className='text-base'>
                                <ul key='fullname'>

                                </ul>
                            </div>
                        </div>
                        <div className='highlight'>
                            <div style={{ paddingTop: 1 }}>
                                <div>
                                    <h4 className='text-lg'>E-mail : {dataSource && dataSource.email}</h4>
                                </div>
                            </div>
                            <div style={{ paddingTop: 1 }} className='text-base'>
                                <ul key='fullname'>

                                </ul>
                            </div>
                        </div>
                        <div className='highlight'>
                            <div style={{ paddingTop: 1 }}>
                                <div>
                                    <h4 className='text-lg'> จำนวนคนเข้าผ่านลิ้งค์ทั้งหมด : {dataSource && dataSource.clickRefCounter}</h4>
                                </div>
                            </div>
                            <div style={{ paddingTop: 1 }} className='text-base'>
                                <ul key='fullname'>

                                </ul>
                            </div>
                        </div>
                        <div className='highlight'>
                            <div style={{ paddingTop: 1 }}>
                                <div>
                                    <h4 className='text-lg'>จำนวนคนเข้าผ่านลิ้งค์วันนี้ : {dataSource && dataSource.totalClickRefCounter}</h4>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <Table columns={mypostsTable} dataSource={tableData} bordered={borderTable.canScroll} rowKey={(record) => record._id} scroll={borderTable.scrollWidth} />
                    </div>
                </div>
            </div>
        </>
    )
}

JobPageID.getInitialProps = async ({ query }) => {
    return {
        query
    }
}


// export async function getStaticPaths() {
//     const res = await fetch(`${BACKEND_API}/jobspost/findall`, {
//         method: 'get'
//     })
//     const posts = await res.json()
//     const paths = posts.data.map((post) => `/job/${post.post_id}`)
//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`${BACKEND_API}/jobspost/post/${params.post_id}`, {
//         method: 'Get'
//     })
//     const post = await res.json()
//     return { props: { post } }
// }