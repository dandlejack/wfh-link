import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {UserApi} from '../../api/UserApi'
import { BACKEND_API } from '../../server.configs'

export default function ReferralLink({query}) {
    const router = useRouter()
    useEffect(() => {
        UserApi.counterByReferralId(query.referral_id).then(res=>{
            if(res === 'success') router.push('/')
        })
        return () => {
        }
    }, [query])

    return (
        <></>
    )
} 

ReferralLink.getInitialProps = async ({ query }) => {
    return {
        query
    }
}