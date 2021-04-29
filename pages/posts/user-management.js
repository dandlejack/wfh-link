import { useState, useEffect } from 'react'
import { Table } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import { mypostsTable, userDetailTable } from '../../util/mockData'
import { UserApi } from '../../api/UserApi'
import Head from 'next/head'
export default function UserManagement() {

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
            UserApi.findUserDetail({
                filterObject: {},
            }).then(res => {
                console.log(res)
                setFetchData({
                    dataSource: res.data,
                    pageNumber: res.pageNumber,
                    totalDocument: res.totalDocument,
                    totalPage: res.totalPage,
                })
            })
        }else{
            window.location.replace('/login')
        }
    }, [])

    return <>
        <Head>
            <title>หน้าจัดการ Admin</title>
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
                            <h2 className='text-xl'>Admin</h2>
                        </div>
                        <div>
                            <Table bordered columns={userDetailTable} dataSource={fetchData.dataSource} />
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