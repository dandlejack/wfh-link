import { useState, useEffect } from 'react'
import { Table,Button } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import Head from 'next/head'
import Link from 'next/link'
import { TopTenApi } from '../../api/TopTenApi'
import { TopTenColumn } from '../../util/mockTableColumn'
export default function TopTenToday() {

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
            TopTenApi.findAll({
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
            <title>จัดการ 10 อันดับรายได้สูงสุดของวัน</title>
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
                            <h2 className='text-xl'>จัดการ 10 อันดับรายได้สูงสุดของวัน</h2>
                        </div>
                        <div className='rounded p-2'>
                            <Link href='/posts/AddReward'><Button type='primary'>เพิ่มข้อมูล</Button></Link>
                        </div>
                        <div>
                            <Table bordered columns={TopTenColumn} dataSource={fetchData.dataSource} />
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