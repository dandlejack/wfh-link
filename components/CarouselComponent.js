import { Carousel } from 'antd'
const contentStyle = {
    height: '210px',
    color: '#fff',
    lineHeight: '210px',
    textAlign: 'center',
    background: '#364d79',    
};
const CarouselComponent = props => {
    return <Carousel className='carousel-set' autoplay>
        <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
}
export default CarouselComponent
