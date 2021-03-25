import { useState, useEffect } from 'react'
import { Table } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import { mypostsTable } from '../../util/mockData'
import { PostApi } from '../../api/PostApi'
import Head from 'next/head'
import { LineChartComponent } from '../../components/Charts/LineChartComponent/LineChartComponent'
import { CounterApi } from '../../api/CounterApi'
import {BACKEND_API} from '../../server.configs'
import { TopTenApi } from '../../api/TopTenApi'
export default function AdminManage() {

    const [fetchData, setFetchData] = useState({
        dataSource: [],
        pageNumber: 1,
        totalDocument: 0,
        totalPage: 1,
    })

    useEffect(() => {
        const getCookieID = Cookie.get('hrme')
        const getVisitor = async () => {
            if (getCookieID !== undefined) {
                TopTenApi.findVisitor().then(res=>{
                    console.log(res)
                })
            }
        }
        getVisitor()
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
                            <LineChartComponent data={[{label:'2021-03-22',value:30},{label:'2021-03-23',value:70},{label:'2021-03-24',value:65},{label:'2021-03-25',value:50}]} title='จำนวนคนเข้าชม' colors={'#eb4034'} />
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