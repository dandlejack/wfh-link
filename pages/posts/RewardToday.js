import { useState, useEffect } from 'react'
import { Table,Button } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import { mypostsTable } from '../../util/mockData'
import { PostApi } from '../../api/PostApi'
import Head from 'next/head'
import Link from 'next/link'
export default function RewardToday() {

    const [fetchData, setFetchData] = useState({
        dataSource: [],
        pageNumber: 1,
        totalDocument: 0,
        totalPage: 1,
    })

    useEffect(() => {
        const getCookieID = Cookie.get('hrme')
        if (getCookieID !== undefined) {
            const userId = JSON.parse(getCookieID)
            PostApi.getAllPosts({
                filterObject: {},
            }).then(res => {
                setFetchData({
                    dataSource: res.data,
                    pageNumber: res.pageNumber,
                    totalDocument: res.totalDocument,
                    totalPage: res.totalPage,
                })
            })
        }
    }, [])

    return <>
        <Head>
            <title>จัดการประกาศรายชื่อผู้ได้รับรางวัลคนโพสดีเด่นประจำวันนี้</title>
            <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta property="og:url" content="https://หาคนโพส.com/"></meta>
            <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
            <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta property="og:site_name" content="หาคนโพส.com"></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container mx-auto h-full'>
            <div className='flex flex-wrap mx-auto p-4 lg:relative'>
                <DashboardMenu />
                <div className='work-manage-body xl:w-4/5'>
                    <div className='box border rounded p-2'>
                        <div>
                            <h2 className='text-xl'>จัดการประกาศรายชื่อผู้ได้รับรางวัลคนโพสดีเด่นประจำวันนี้</h2>
                        </div>
                        <div className='rounded p-2'>
                            <Link href='/posts/AddReward'><Button type='primary'>เพิ่มข้อมูล</Button></Link>
                        </div>
                        <div>
                            <Table bordered columns={mypostsTable} dataSource={fetchData.dataSource} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export async function getStaticProps() {
    return {
        props: {}
    }
}