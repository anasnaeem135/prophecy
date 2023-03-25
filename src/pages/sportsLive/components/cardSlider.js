import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Football from 'images/football.png';

import style from './cardSlider.module.css';

const CardSlider = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <div className={style.carouselContainer}>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                // autoPlay={true}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={500}
                // containerClass="carousel-container"
                // removeArrowOnDeviceType={['tablet', 'mobile']}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                <div className={style.cardContainer}>
                    <img src={Football} className={style.img} />

                    <h1 className={style.title}>Football</h1>
                </div>
                <div className={style.cardContainer}>
                    <img src={Football} className={style.img} />

                    <h1 className={style.title}>Football</h1>
                </div>
                <div className={style.cardContainer}>
                    <img src={Football} className={style.img} />

                    <h1 className={style.title}>Football</h1>
                </div>
                <div className={style.cardContainer}>
                    <img src={Football} className={style.img} />

                    <h1 className={style.title}>Football</h1>
                </div>
            </Carousel>
        </div>
    );
};

export default CardSlider;