import { useState, useEffect, useRef } from 'react'
import { PostApi } from '../../api/PostApi'
import { Card, Form, Input, TreeSelect, Result, Pagination } from 'antd'
import { rangeOfJobs, workSelectedHeader } from '../../util/mockData'
import { SearchOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicPostComponent = dynamic(()=>import('../../components/PostComponent'),{
    ssr:false
})

const DynamicHiddenContent = dynamic(()=>import('../../components/HiddenContent'),{
    ssr:false
})
export default function JobPage({ queryData, paramsData }) {
    const [hideSearchItem, setHideSearchItem] = useState(false)
    const [filterObjectState, setFilterObjectState] = useState({})
    const router = useRouter()
    const [pageData, setPageData] = useState({
        pageNumber: 1,
        totalDocument: 1,
        totalPage: 1
    })
    const [selectValue, setSelectValue] = useState([])
    const [selectProvinceValue, setSelectProvinceValue] = useState([])
    const [id, setID] = useState('')
    const [dataSource, setDataSource] = useState([])
    const { SHOW_PARENT } = TreeSelect
    const [form] = Form.useForm()
    const cardRef = useRef()
    useEffect(() => {
        const header = document.getElementById('search-nav')
        const contentCard = document.getElementById('content-card')
        const searchBtn = document.getElementById('search-btn-id')
        const stickyHeader = header.offsetTop
        const scrollHeader = window.addEventListener("scroll", () => {
            if (window.pageYOffset > stickyHeader) {
                header.classList.add("stickys");
                header.classList.add("header-sticky-height-width");
                contentCard.classList.add("content-card-sticky")
                if (window.screen.width <= 1023) {
                    searchBtn.classList.add("hidden-search")
                    setHideSearchItem(true)
                }
            } else {
                header.classList.remove("stickys")
                header.classList.remove("header-sticky-height-width");
                contentCard.classList.remove("content-card-sticky")
                if (window.screen.width <= 1023) {
                    searchBtn.classList.remove("hidden-search")
                    setHideSearchItem(false)
                }
            }
        })
        const searchClick = window.addEventListener("click", () => {
            if (window.pageYOffset > stickyHeader) {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0;
            }
        })
        return () => {
            window.removeEventListener("scroll", scrollHeader)
            window.removeEventListener("click", searchClick)
        }

    }, [])


    useEffect(() => {
        let filterObject = {}
        if (queryData.place !== undefined && queryData.worksType !== undefined) {
            if (queryData.place === 'ระยะเวลารับงานทั้งหมด' && queryData.worksType === 'ประเภทงานทั้งหมด') {
                filterObject = {
                    all_province: queryData.place,
                    all_works: queryData.worksType
                }
            } else if (queryData.place === 'ระยะเวลารับงานทั้งหมด') {
                filterObject = {
                    all_province: queryData.place,
                    work_select: queryData.worksType
                }
            } else if (queryData.worksType === 'ประเภทงานทั้งหมด') {
                filterObject = {
                    province: queryData.place,
                    all_works: queryData.worksType
                }
            } else {
                filterObject = {
                    province: queryData.place,
                    work_select: queryData.worksType
                }
            }
        } else if (paramsData[1] === "job-location") {
            if (paramsData[paramsData.length - 1] === 'ระยะเวลารับงานทั้งหมด') {
                filterObject = {
                    all_province: paramsData[paramsData.length - 1]
                }
            } else {
                filterObject = {
                    province: paramsData[paramsData.length - 1]
                }
            }
        } else { // กรณีที่มีชื่อบริษัทเข้ามาค้นหา
            filterObject = {
                company_name: paramsData[0]
            }
        }
        setFilterObjectState(filterObject)
        PostApi.getAllPosts({
            filterObject: filterObject
        }).then(res => {
            setPageData({
                pageNumber: res.pageNumber,
                totalDocument: res.totalDocument,
                totalPage: res.totalPage
            })
            if(res.data.length>2){
                document.body.style.overflowY = 'scroll'
            }else{
                document.body.style.overflowY = 'hidden'
            }
            setDataSource(res.data)
        })
    }, [queryData])

    const pageChange = (currentPage) => {
        PostApi.getAllPosts({
            filterObject: filterObjectState,
            pageNumber: currentPage,
        }).then(res => {
            setDataSource(res.data);
            setPageData({
                pageNumber: res.pageNumber,
                totalDocument: res.totalDocument,
                totalPage: res.totalPage
            })
        }).catch(e => {
            console.log(e);
        });
    };

    const onFinish = (e) => {
        if (e.company_name === undefined) {
            e.company_name = ''
        }
        if (e.company_name !== '' && e.province === 'ระยะเวลารับงานทั้งหมด' && e.work_select === 'ประเภทงานทั้งหมด') {
            Router.push({
                pathname: `/search/${e.company_name}`,
            })
        } else if (e.province !== 'ระยะเวลารับงานทั้งหมด' && e.work_select === 'ประเภทงานทั้งหมด') {
            Router.push({
                pathname: `/search/FindJobs/job-location/${e.province}`,
            })
        } else {
            Router.push({
                pathname: '/search/FindJobs',
                query: { place: e.province, worksType: e.work_select }
            })
        }
    }

    const handleProvinceTreeSelect = value => {
        const checkValueIndex = value.findIndex(val => val === 'ระยะเวลารับงานทั้งหมด')
        if (value[value.length - 1] === 'ระยะเวลารับงานทั้งหมด') {
            if (value.length > 1) {
                value[0] = 'ระยะเวลารับงานทั้งหมด'
                value.splice(1, value.length)
            }
        } else {
            if (checkValueIndex > -1)
                value.splice(checkValueIndex, 1)
        }
        setSelectProvinceValue(value)
    }

    const handleCard = (event) => {
        if (event.target.dataset.postId !== undefined) {
            setID(event.target.dataset.postId)
        }
    }
    const handleTreeSelect = value => {
        const checkValueIndex = value.findIndex(val => val === 'ประเภทงานทั้งหมด')
        if (value[value.length - 1] === 'ประเภทงานทั้งหมด') {
            if (value.length > 1) {
                value[0] = 'ประเภทงานทั้งหมด'
                value.splice(1, value.length)
            }
        } else {
            if (checkValueIndex > -1)
                value.splice(checkValueIndex, 1)
        }
        setSelectValue(value)
    }
    return (
        <>
            <Head>
                <title>ค้นหา</title>
                <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
                <meta property="og:url" content="https://หาคนโพส.com/"></meta>
                <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
                <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
                <meta property="og:site_name" content="หาคนโพส.com"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className='bg-blue-600' id='search-nav'>
                <div className="inline-block w-full sm:h-48 lg:h-14">
                    <div className="sm:block container sm my-0 mx-auto  pl-4 lg:pl-0 pb-4 lg:pb-0 h-full pt-3 "> {/* ลองเอา hidden ออก*/}
                        <Form
                            layout="inline"
                            form={form}
                            onFinish={onFinish}
                            initialValues={{
                                province: rangeOfJobs[0].value,
                                work_select: workSelectedHeader[0].value,
                            }}
                            className='flex justify-center'
                            scrollToFirstError
                        >
                            <Form.Item
                                name='company_name'
                                className='w-full mb-2 py-2 lg:w-3/12 rounded-sm mr-1 _mRs'
                                rules={[{ required: false }]}
                            >
                                <Input placeholder='ระบุคำที่ต้องการค้นหา' prefix={<SearchOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name='province'
                                className='w-full mb-2 py-2 lg:w-3/12 rounded-sm mr-1 _mRs'
                                rules={[{ required: false }]}
                                hidden={hideSearchItem}
                            >
                                <TreeSelect
                                    showArrow
                                    showCheckedStrategy={SHOW_PARENT}
                                    value={selectProvinceValue}
                                    treeCheckable={true}
                                    treeData={rangeOfJobs}
                                    onChange={e => handleProvinceTreeSelect(e)}
                                    maxTagPlaceholder={`+ ${selectProvinceValue.length - 2} Selected`}
                                    maxTagCount={2}
                                    treeIcon={<HomeOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name='work_select'
                                className='w-full mb-2 py-2 mr-1 lg:w-3/12 rounded-sm  treeselect-index _mRs'
                                rules={[{ required: false }]}
                                hidden={hideSearchItem}
                            >
                                <TreeSelect
                                    showArrow
                                    showCheckedStrategy={SHOW_PARENT}
                                    value={selectValue}
                                    treeCheckable={true}
                                    treeData={workSelectedHeader}
                                    onChange={e => handleTreeSelect(e)}
                                    maxTagPlaceholder={`+ ${selectValue.length - 2} Selected`}
                                    maxTagCount={2}
                                />
                            </Form.Item>
                            <div className='flex justify-center lg:inline-block w-full lg:w-auto sm:pb-3 pr-5 '>
                                <button id='search-btn-id' type="submit" className="w-full lg:w-24 lg:h-9 group relative justify-center py-2 px-4 ml-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                                    หางาน
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </nav>
            <div className='container mx-auto'>
                <div className='mx-auto flex flex-row pt-2 flexSet'>
                    <div className='flex-initial mx-2'>
                        {dataSource.length > 0 && dataSource.map((data, index) => {
                            return <div className='job-card' key={data._id + 'div'} ref={cardRef} tabIndex={-1} data-post-id={data._id} onFocus={event => handleCard(event)} >
                                <article key={data._id + 'article'}>
                                    <div style={{ maxHeight: 200 }} className='mb-2'>
                                        <img alt='หาคนโพส.com' className='findjob-title-image' src={'http://api.หาคนโพส.com/photos/default_header.jpg'} style={{ maxHeight: 200, width: '100%' }} />
                                    </div>
                                    <div style={{ maxWidth: 112, maxHeight: 60 }} className='mb-2'>
                                        <img alt='หาคนโพส.com' src={data.logo_image} style={{ maxWidth: 112, maxHeight: 60 }}  />
                                    </div>
                                    <div className='mt-9'>
                                        <h1 className='text-base' style={{ marginBottom: 0 }}>
                                            <Link href={`/job/${data.post_id}`} key={data._id + 'link'}><a >
                                                <div>{data.post_title}</div>
                                            </a></Link>
                                        </h1>
                                        <span>{data.company_name}</span>
                                    </div>
                                    <div className='mt-4 font-semibold'>
                                        <div>
                                            <p>{data.province.join(', ')}</p>
                                        </div>

                                    </div>
                                    <ul key={data._id + 'ul' + index}>
                                        {data.jobshighlights.map((highlightData, index) => {
                                            return (
                                                <li id={highlightData._id} key={highlightData.highlight + 'li' + index}>
                                                    <div className='flex' >
                                                        <div style={{ height: 20, marginTop: 9, marginRight: 10 }}>
                                                            <div style={{ backgroundColor: '#1c1c1c', width: 4, height: 4, borderRadius: '50%' }}></div>
                                                        </div>
                                                        <div>{highlightData.highlight}</div>
                                                    </div>
                                                </li>)
                                        })}
                                    </ul>
                                    <DynamicHiddenContent />
                                </article>
                            </div>
                        })}
                        <div className='my-3 text-center'>
                            <Pagination onChange={e => pageChange(e)} pageSize={30} current={pageData.pageNumber} total={pageData.totalDocument} />
                        </div>
                    </div>
                    <div className='hidden lg:flex md:flex-1' >
                        {dataSource.length > 0 ?
                            <div id='content-card' className='content-card-class' >
                                <Card key='job-card-key'>
                                    {id !== '' ?
                                        <DynamicPostComponent id={id} />
                                        :
                                        <Result
                                            className='h-screen'
                                            icon={<BookOutlined />}
                                            title={`เรามี ${dataSource.length} ตำแหน่งงานสำหรับคุณ`}
                                            subTitle='เลือกตำแหน่งงานเพื่อดูรายละเอียด'

                                        />
                                    }

                                </Card>
                            </div> :
                            <div id='content-card' className='bg-white h-screen container'>
                                <Result
                                    status='404'
                                    title='ไม่พบตำแหน่งงานที่คุณต้องการ'
                                    subTitle='ตรวจสอบตัวสะกดหรือลองเปลี่ยนเกณฑ์การค้นหาอีกครั้ง'
                                />
                            </div>
                        }
                    </div>

                </div>
            </div></>
    )
}

JobPage.getInitialProps = async ({query}) => {
    const queryData = {
        place:query.place,
        worksType:query.worksType
    }
    const paramsData = query.find_job    
    return {
        queryData,paramsData
}}


// export const getServerSideProps = async ({ query, params }) => {
//     const queryData = query;
//     const paramsData = params
//     return {
//         props: { queryData, paramsData }
//     }
// }