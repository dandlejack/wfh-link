import { Carousel } from 'antd'
const contentStyle = {
    height: '210px',
    color: '#fff',
    lineHeight: '210px',
    textAlign: 'center',
    background: '#364d79',    
    width:'100%'
};
const CarouselComponent = props => {
    return <Carousel className='carousel-set' autoplay>
        <div>
         <img style={contentStyle} src='https://www.jobtopgun.com/images/banner-large.png'/>
        </div>
        <div>
            <h3><img style={contentStyle} src='https://www.jobtopgun.com/images/standalonemv-large.png'/></h3>
        </div>
    </Carousel>
}
export default CarouselComponent
