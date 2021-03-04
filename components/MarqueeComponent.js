import { Divider } from "antd"

const MarqueeComponent = (props) => {
    return (
        <div className={`sm:flex-auto lg:flex-1 ${props.consstyle} shadow-sm border rounded-md border-gray-300 marquee-bg`}>
            {/* <h3 className='pb-3 pl-3 pt-3 pr-3 rounded-t-md bg-blue-600 text-white text-lg'>{props.title}</h3> */}
            <h3 className='box-header p-1 pl-5 text-lg text-center' style={{ background: 'linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%)' }}>{props.title}</h3>

            <div className='marquee-style'>
                {props.data.list_data !== undefined ? props.data.list_data.map((data, index) => {
                    return <><p className='w-full'>
                        <span className='text-xl'>{index + 1}.{data.lucky_name}</span>                       
                        <span className='float-right text-xl '>{data.reward} ฿</span>
                    </p></>
                }) : <></>}
            </div>
        </div>
    )
}

export default MarqueeComponent