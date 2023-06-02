import { useCallback, useContext, useEffect, useState } from "react";
import { BASE_IMAGE, Context, getApi } from "../../Settings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation, Scrollbar } from "swiper";
import { MovieCarousel } from "../../Page_Items";
import "swiper/swiper-bundle.min.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import {Pagination as ReactPaginate} from "../../Pagination"
import { Action } from "../../Settings/store/reducer";
export const Popular = () => {
  const { user, popularPage, setPopularPage } = useContext(Context);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const selector = useSelector((posts) => posts.Reducer)
  const dispatch = useDispatch()
  const getPopular = useCallback(async () => {
    const request = await getApi.getPopular(popularPage);
    const response = await request.data;
    setPageCount(499)
    setData(response);
  }, [popularPage]);
  const getPopularMovies = useCallback(async () => {
    const request = await getApi.getPopular(popularPage+1)
    const response = request.data
    dispatch(Action.setPosts(response?.results))
  },[popularPage])
  useEffect(() => {
    getPopular();
    getPopularMovies()
}, [getPopular]);
  return (
    <div className="popular__page">
      <div className="container_fluid">
        <div className="home_page_title">
          <h1>Popular Movies</h1>
        </div>
        <div style={{marginTop: "1rem"}} className="popular__page_movies">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {data?.results?.map((item) => {
              return (
                <SwiperSlide>
                  <MovieCarousel
                    img={BASE_IMAGE + item.backdrop_path}
                    id={item.id}
                    item={item}
                    likes={false}
                    name={item.title}
                    year={item.release_date}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="popular__movies">
            {selector?.posts?.map(item => (
                <MovieCarousel img={BASE_IMAGE + item.backdrop_path}
                id={item.id}
                item={item}
                likes={true}
                name={item.title}
                year={item.release_date} />                
            ))}
        </div>
        <ReactPaginate pageCount={pageCount} setPage={setPopularPage} />
      </div>
    </div>
  );
};
