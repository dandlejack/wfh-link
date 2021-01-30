import { useState, useEffect } from 'react'
import { Table } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import { mypostsTable } from '../../util/mockData'
import { PostApi } from '../../api/PostApi'
import Head from 'next/head'
export default function AdminManage() {

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
            <title>หน้าจัดการ Admin</title>
            <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:url" content="https://aks124.com/"></meta>
            <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
            <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
            <meta property="og:site_name" content="aks124.com"></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container mx-auto'>
            <div className='mx-auto p-4'>
                <DashboardMenu />
                <div className='work-manage-body'>
                    <div className='box border rounded p-2'>
                        <div>
                            <h2 className='text-xl'>Admin</h2>
                        </div>
                        <Table bordered columns={mypostsTable} dataSource={fetchData.dataSource} />
                    </div>
                </div>
            </div>
        </div>
    </>
}