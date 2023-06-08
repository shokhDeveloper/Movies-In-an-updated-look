import "./LocalsMovies.css";
import {Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { useCart } from "react-use-cart"
import { SwiperSlide, Swiper } from "swiper/react"
import { MovieCarousel } from "../Page_Items"
import { BASE_IMAGE } from "../Settings"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export const LocalsMovie = () => {
    const {items} = useCart()
    console.log(items)
    return(
        <div className="locals_movie">
            <div className="container_fluid">
                <div className="home_page_title">
                    <h1>Locals Movie</h1>
                </div>
                <div className="locals_movies">
                {items?.length ? (
                    <Swiper 
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                   >
                        {items?.map(item => {
                            return(
                                <SwiperSlide>
                                    <MovieCarousel id={item.id} img={BASE_IMAGE+item.backdrop_path} item={item} likes={false} name={item.title} year={item.release_date} key={item.id} />
                                </SwiperSlide>     
                            )
                        })}
                    </Swiper>
                ): (
                    <h2 className="error">Hali saqlanganlar mavjud emas</h2>
                )}
                </div>
            </div>
        </div>
    )
}