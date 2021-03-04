import { useState, useEffect } from 'react'
import { Button, DatePicker, Select } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu'
import { mypostsTable } from '../../util/mockData'
import { PostApi } from '../../api/PostApi'
import { rewardColumns } from '../../util/mockTableColumn'
import Head from 'next/head'
import { EditableTable } from '../../components/EditTable/EditableTable'
import { TopTenApi } from '../../api/TopTenApi'
export default function AddReward() {
    const [dataSource, setDataSource] = useState([])
    const [postDate, setPostDate] = useState('')
    const [selectPostType, setSelectPostType] = useState(1)
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

    const handleSave = () => {        
        if(selectPostType === 1){ // 10 ทั้งหมด
            const data = {
                topten_date: postDate,
                list_data: dataSource,
                hightest_all:true
            }
            TopTenApi.createNewPost(data).then(res=>{
                if(res.data === "Post Successful"){
                    window.location.reload()
                }
            })
        }else if(selectPostType === 2){ // 10 ของวัน
            const data = {
                topten_date: postDate,
                list_data: dataSource,
                hightest_all:false
            }
            TopTenApi.createNewPost(data).then(res=>{
                if(res.data === "Post Successful"){
                    window.location.reload()
                }
            })
        }
    }

    const getTableData = (data) => {
        setDataSource(data)
    }

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
                    <div className='box p-2'>
                        <div>
                            <h2 className='text-xl'>เพิ่มประกาศรายชื่อผู้ได้รับรางวัลคนโพส</h2>
                        </div>
                        <div className='w-full mb-4'>
                            <span>ประเภทประกาศ : </span>
                            <Select style={{width:300}} defaultValue={1} onChange={e => setSelectPostType(e)} >
                                <Select.Option key={1} value={1} >10 อันดับรายได้สูงสุดของทั้งหมด</Select.Option>
                                <Select.Option key={2} value={2} >10 อันดับรายได้สูงสุดของวัน</Select.Option>
                                {/* <Select.Option key={3} value={3} >รายชื่อผู้ได้รับรางวัลคนโพสดีเด่นประจำวันนี้</Select.Option> */}
                            </Select>
                        </div>
                        <div className='mb-4'>
                            <span className='pr-4'>วันที่ประกาศ : </span><DatePicker style={{width:300}} format='DD/MM/YYYY' onChange={(date, dateString) => setPostDate(dateString)} />
                        </div>
                        <div>
                            <EditableTable bordered column={rewardColumns} data={dataSource} startCount={dataSource.length + 1} getData={getTableData} />
                        </div>
                    </div>
                    <div className='p-2'>
                        <Button type='primary' onClick={handleSave}>บันทึก</Button>
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