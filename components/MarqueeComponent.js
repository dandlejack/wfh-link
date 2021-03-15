import { useState, useEffect } from 'react'
import { BACKEND_API } from '../server.configs'
const MarqueeComponent = (props) => {
    const [datas, setData] = useState([])

    useEffect(() => {
        const getMarqueeData = async () => {
            if (props.title === '10อันดับรายได้สูงสุดของวัน') {
                const lastest = await fetch(BACKEND_API + '/jobspost/findCompanyRequired', {
                    method: 'GET'
                })
                const data = await lastest.json()
                const pushKey = {
                    list_data: data
                }
                setData(pushKey)
            }
            if (props.title === 'ยินดีต้องรับสมาชิกใหม่') {
                const hiddenString = 'XXXX'
                const lastest = await fetch(BACKEND_API + '/users/findUsersAds', {
                    method: 'GET'
                })
                const data = await lastest.json()
                const getDataLength = data.length
                if (getDataLength > 0) {
                    const editTelNumber = data.map(data=>{
                        const newTelNum = data.telNumber.slice(0,6)+hiddenString
                        return {firstname:data.firstname,telNumber:newTelNum}
                    })
                    const pushKey = {
                        list_data: editTelNumber
                    }
                    setData(pushKey)
                }
            }
        }
        getMarqueeData()
    }, [])
    
    return (
        <div className={`sm:flex-auto lg:flex-1 ${props.consstyle} shadow-sm border rounded-md border-gray-300 marquee-bg`}>
            <h3 className='box-header p-1 pl-5 pb-2 mb-0 text-lg text-center text-white' style={{ background: 'linear-gradient(to bottom, rgba(29, 78, 216,1) 0%,rgba(37, 99, 235,1) 50%, rgba(29, 78, 216,1) 100%)' }}>{props.title}</h3>

            <div className='marquee-style'>
                {datas.list_data !== undefined ? datas.list_data.map((data, index) => {
                    return <><p className='w-full'>
                        <span className='text-xl'>{data.company_name || data.firstname}</span>
                        {props.title === 'ยินดีต้องรับสมาชิกใหม่' ? <span className='float-right text-xl '>{data.telNumber}</span>:
                        <span className='float-right text-xl '>{data.required_worker} ตำแหน่ง</span>}
                    </p></>
                }) : <></>}
            </div>
        </div>
    )
}
//style={{ background: 'linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%)' }}
export default MarqueeComponent