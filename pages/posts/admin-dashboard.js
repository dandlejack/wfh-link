import { useState, useEffect } from 'react'
import DashboardMenu from '../../components/DashboardMenu'
import Head from 'next/head'
import { BarChartComponent } from '../../components/Charts/BarChartComponent/BarChartComponent'
export default function AdminManage() {


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
                            <BarChartComponent title='จำนวนคนเข้าชม' colors={'#eb4034'} />
                        </div>
                        {/* {[{label:'2021-03-22',value:30},{label:'2021-03-23',value:70},{label:'2021-03-24',value:65},{label:'2021-03-25',value:50}]} */}
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