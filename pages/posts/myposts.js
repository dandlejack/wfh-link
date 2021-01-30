import { useState, useEffect } from 'react'
import { Table } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import { mypostsTable } from '../../util/mockData'
import { PostApi } from '../../api/PostApi'
import Head from 'next/head'

export default function myposts() {
    const [borderTable, setBorderTable] = useState(
        {
            canScroll:true,
            scrollWidth: { 
                x: 'calc(700px + 50%)', 
                y: 'auto' 
            }
        }
    )
    const [fetchData, setFetchData] = useState({
        dataSource: [],
        pageNumber: 1,
        totalDocument: 0,
        totalPage: 1,
    })
    useEffect(() => {
        const screenWidth = screen.width
        if(screenWidth >=1536){
            setBorderTable({
                canScroll:false,
                scrollWidth:{
                    x:'auto'
                }
            })
        }else{
            setBorderTable({
                canScroll:true,
                scrollWidth: { 
                    x: 'calc(700px + 50%)', 
                    y: 'auto' 
                }
            })
        }
        const getCookieID = Cookie.get('hrme')
        if (getCookieID !== undefined) {
            const userId = JSON.parse(getCookieID)
            PostApi.getPostByUserID({
                filterObject: { 'user_id': userId._id },
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
        <title>โพสต์ของฉัน</title>
        <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://aks124.com/"></meta>
        <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
        <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:site_name" content="aks124.com"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>    
    <div className='container mx-auto h-full'>
        <div className='flex flex-wrap mx-auto p-4 lg:relative'>
            <DashboardMenu />
            <div className='work-manage-body xl:w-4/5'>
                <div className='box border rounded p-2'>
                    <div>
                        <h2 className='text-xl'>ประกาศของฉัน</h2>
                    </div>
                    <Table bordered={borderTable.canScroll} columns={mypostsTable} dataSource={fetchData.dataSource} rowKey={(record)=>record._id} scroll={borderTable.scrollWidth} />
                </div>
            </div>
        </div>
    </div>
    </>
}