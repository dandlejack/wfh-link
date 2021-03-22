import { BACKEND_API } from "../server.configs"

export const LineAdsIndex = () => {
    return (
        <a href='https://line.me/ti/p/%40Richpostit' target='_blank'>
            <div className='fixed top-2/4 right-4 w-40'>
                <img src={`${BACKEND_API}/photos/richpostitQR.png`} />
            </div>
        </a>
    )
}