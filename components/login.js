import { useState } from 'react'
import { Form } from 'antd'
import { UserApi } from '../api/UserApi'
import jwt_decode from 'jwt-decode';
import Link from 'next/link'
import Cookie from 'js-cookie'
import Head from 'next/head'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    const formItemLayout = {
        labelCol: {
            xs: { span: 5 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 16 },
        },
    };

    const handleLogin = () => {
        const userData = {
            email: email,
            password, password
        }
        try {
            UserApi.postSignin(userData).then(response => {
                if(response.token){
                    const jwtDecoded = jwt_decode(response.token);
                    const parseJwtDecoded = JSON.parse(JSON.stringify(jwtDecoded));
                    const expDate = new Date(parseJwtDecoded.exp * 1000);
                    Cookie.set('token', response.token, { expires: expDate });
                    Cookie.set('hrme', { _id: parseJwtDecoded._id, name: parseJwtDecoded.firstname }, { expires: expDate })            
                    window.location.replace('/')
                    return response
                }else{
                    setErrorMsg(response.msg)
                }
                
            })
        } catch {
            window.location.replace('/404error')
        }
        
    }

    return <>
    <Head>
        <title>เข้าสู่ระบบ</title>
        <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://aks124.com/"></meta>
        <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
        <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:site_name" content="aks124.com"></meta>
    </Head>
    <div className='container mx-auto h-full'>
        <div className='max-w-lg my-16 mx-auto'>
            <div className='mx-5 p-6' style={{ boxShadow: '0 0 3px #666', background:'#fff', borderRadius:5 }}>

                <div>
                    <h1 className='text-xl' style={{ textShadow: '1px 1px 1px #ccc', padding: 10 }}>เข้าสู่ระบบ</h1>
                </div>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autoComplete="email" required onChange={e => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required onChange={e => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                </div>
                <Form {...formItemLayout}>
                    <div className='my-6'>
                        <button type="submit" onClick={handleLogin} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-whie group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            LOGIN
                        </button>
                    </div>
                </Form>
               {errorMsg !== ''? <div className='text-red-500 text-lg text-center mb-3'>
                    <span>อีเมล์หรือรหัสผ่านผิดพลาด</span>
                </div>:null}
                <div className='flex flex-wrap'>
                    <a className='flex-1 text-gray-500 hover:text-gray-500 underline '>Forgot Password?</a>
                    <p className='flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto text-center'>or</p>
                    <Link href="/register"><a className='flex-1 text-gray-500 hover:text-gray-500 underline text-right'>Register</a></Link>
                </div>
            </div>
        </div>
    </div></>
}

export default Login