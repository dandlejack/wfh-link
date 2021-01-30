import { Form, Input, Checkbox } from 'antd'
import { useState } from 'react';
import {UserApi} from '../api/UserApi'
import Head from 'next/head'
const Register = () => {
    const [resData, setResData] = useState('')
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

    const handleSubmit = (userData) => {
        userData.role = 'user'
        UserApi.postSignup(userData).then(res=>{
            return res.data
        }).then(result=>{
            if(result.success){
                window.location.replace('/login')
            }else{
                setResData(result.data)
            }
            console.log(result)
        })
    }
    return <>    
    <Head>
        <title>สมัครสมาชิก</title>
        <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://aks124.com/"></meta>
        <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
        <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:site_name" content="aks124.com"></meta>
    </Head>
    <div className='container mx-auto'>
        <div className='max-w-lg my-16 mx-auto'>
            <div className='mx-5 p-6' style={{boxShadow:'0 0 3px #666',background:"#fff"}}>
                {/* <input type="hidden" name="remember" value="true"/>
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                     <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                    </div>
                </div> */}
                <div>
                <h1 className='text-xl' style={{textShadow:'1px 1px 1px #ccc',padding:10}}>สมัครสมาชิก</h1>
                </div>
                <Form {...formItemLayout} onFinish={handleSubmit}>
                    <Form.Item
                        style={{ marginBottom: 15 }}
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 15 }}
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="firstname"
                        label='ชื่อ'
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label='นามสกุล'
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                            },
                        ]}
                    >
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <div>
                    <span><strong className='text-red-500'>{resData}</strong></span>
                    </div>
                    <div className='my-6'>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" >
                            สมัครสมาชิก
                        </button>
                    </div>

                </Form>
            </div>
        </div>
    </div></>
    
}
export default Register
