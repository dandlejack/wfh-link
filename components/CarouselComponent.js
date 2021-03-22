import { Carousel } from 'antd'
const contentStyle = {
    height: '245px',
    color: '#fff',
    lineHeight: '245px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%'
};
const CarouselComponent = props => {
    return <Carousel className='carousel-set' autoplay>
        <div>
            <a href='https://line.me/ti/p/%40Richpostit' target='_blank'><img style={contentStyle} src='https://api.หาคนโพส.com/photos/slide_3.jpg' /></a>
        </div>
        <div>
            <a href='https://line.me/ti/p/%40Richpostit' target='_blank'><h3><img style={contentStyle} src='https://api.หาคนโพส.com/photos/slide_2.jpg' /></h3></a>
        </div>
    </Carousel>
}
export default CarouselComponent
