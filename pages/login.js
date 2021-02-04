import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Login from '../components/login'
import Cookie from 'js-cookie'

export default function LoginPage() {
    const [login,setLogin] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        const getCookieData = Cookie.get('hrme')
        if (getCookieData!==undefined) {
            setLogin(true)
            router.push('/')
        }
    },[router.pathname])
    
    return login ?<></>:<Login/>
}
export async function getStaticProps(context) {
    return {
        props:{}
    }
}