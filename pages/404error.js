import {} from 'react'
import {Result,Button} from 'antd'
export default function Error404(){
    return <div className='container mx-auto h-screen relative bg-white'>
        <Result
    status="500"
    title="404"
    subTitle="เกิดปัญหาระบบขัดข้อง กำลังแก้ไข"    
  />,

    </div>
}