import { Form, Input, Checkbox } from 'antd'
import { useState } from 'react';
import { UserApi } from '../api/UserApi'
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
        UserApi.postSignup(userData).then(res => {
            return res.data
        }).then(result => {
            if (result.success) {
                window.location.replace('/login')
            } else {
                setResData(result.data)
            }
        })
    }
    return <>
        <Head>
            <title>สมัครสมาชิก</title>
            <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta property="og:url" content="https://หาคนโพส.com/"></meta>
            <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
            <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
            <meta property="og:site_name" content="หาคนโพส.com"></meta>
        </Head>
        <div className='container mx-auto h-full'>
            <div className='max-w-lg my-16 mx-auto'>
                <div className='mx-5 p-6' style={{ boxShadow: '0 0 3px #666', background: "#fff" }}>
                    <div>
                        <h1 className='text-xl' style={{ textShadow: '1px 1px 1px #ccc', padding: 10 }}>สมัครสมาชิก</h1>
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
                                I have read the <a href="#">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <div>
                            <span><strong className='text-red-500'>{resData}</strong></span>
                        </div>
                        <div className='my-6'>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                                สมัครสมาชิก
                        </button>
                        </div>

                    </Form>
                </div>
            </div>
        </div></>

}
export default Register
