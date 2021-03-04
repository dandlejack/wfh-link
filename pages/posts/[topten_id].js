import { useState, useEffect } from 'react'
import { Button, Table } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import DashboardMenu from '../../components/DashboardMenu'
import { TopTenApi } from '../../api/TopTenApi'
import { rewardColumns } from '../../util/mockTableColumn'
export default function TopTenDetailPage({ query }) {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        TopTenApi.findByID(query.topten_id)
            .then(res => {
                setDataSource(res[0])
                return res
            })
    }, [query])
    console.log(dataSource)

    return (
        <>             
        <Head>
            <title>จัดการ 10 อันดับรายได้สูงสุดของทั้งหมด</title>
        </Head>
        <div className='container mx-auto h-full'>
            <div className='flex flex-wrap mx-auto p-4 lg:relative'>
                <DashboardMenu />
                <div className='work-manage-body xl:w-4/5'>
                    <div className='box border rounded p-2'>
                        <div>
                            <h2 className='text-xl'>รายการ 10 อันดับรายได้สูงสุดประจำวันที่ {dataSource.topten_date}</h2>
                        </div>
                        <div className='rounded p-2'>
                            <Link href='/posts/AddReward'><Button type='primary'>เพิ่มข้อมูล</Button></Link>
                        </div>
                        <div>
                            <Table bordered columns={rewardColumns} dataSource={dataSource.list_data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

TopTenDetailPage.getInitialProps = async ({ query }) => {
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