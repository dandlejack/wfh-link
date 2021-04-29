import { useState, useEffect, useRef } from 'react'
import { Table, Button } from 'antd'
import Cookie from 'js-cookie'
import DashboardMenu from '../components/DashboardMenu'
import Head from 'next/head'
import Link from 'next/link'
import { UserApi } from '../api/UserApi'
import { CopyTwoTone } from '@ant-design/icons'
import Router from 'next/router'
export default function ReferralPage() {
    const [myReferral, setMyReferral] = useState('')
    const [clickRefCounter, setClickRefCounter] = useState({
        today: 0,
        total: 0,
    })
    const [fetchData, setFetchData] = useState({
        dataSource: [],
        pageNumber: 1,
        totalDocument: 0,
        totalPage: 1,
    })
    const referralRef = useRef(null)
    useEffect(() => {
        const getCookieID = Cookie.get('hrme')
        if (getCookieID !== undefined) {
            const userData = JSON.parse(getCookieID)
            UserApi.findByReferralId(userData.referral).then(res => {
                setClickRefCounter({
                    today: res.clickRefCounter,
                    total: res.totalRefCounter
                })
                console.log(res)
                setMyReferral(userData.referral)
            })
        } else {
            Router.push('/login')
        }
    }, [])

    const CopyFunc = (content) => {
        const el = document.createElement('textarea');
        el.value = 'https://www.หาคนโพส.com/invite/' + content;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

    }

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
                            <h2 className='text-xl'>จำนวนคนเข้าชมผ่านลิ้งค์ทั้งหมด : {clickRefCounter.total}</h2>
                            <h2 className='text-xl'>จำนวนคนเข้าชมผ่านลิ้งค์ในวันนี้ : {clickRefCounter.today}</h2>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='text-center mx-auto w-4/5 bg-blue-600 p-8 mt-8 rounded-lg '>
                        <h2 className='text-xl text-white'>Your Referral Link</h2>
                        <div className='bg-white h-10 leading-10 w-11/12 lg:w-1/2 lg:mx-auto rounded-sm shadow-xl relative cursor-pointer' onClick={e => CopyFunc(myReferral)}>
                            <span className='text-lg mr-2' >{myReferral}</span>
                        </div>
                        <div className='mt-2'>
                            <span className=' text-white'>Tab or click to Copy !!!</span>
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