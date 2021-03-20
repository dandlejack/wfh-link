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
            <img style={contentStyle} src='http://api.หาคนโพส.com/photos/slide_1.jpg' />
        </div>
        <div>
            <h3><img style={contentStyle} src='http://api.หาคนโพส.com/photos/slide_2.jpg' /></h3>
        </div>
    </Carousel>
}
export default CarouselComponent
