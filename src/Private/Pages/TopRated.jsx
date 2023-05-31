
import "./TopRated.css"
import { useCallback, useContext, useEffect, useState } from "react";
import { BASE_IMAGE, Context } from "../../Settings";
import { getApi } from "../../Settings";
import { useQueries, useQuery } from "react-query";
import { Movuie } from "../../Movie";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/swiper-bundle.min.css"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { MovieCarousel } from "../../Page_Items";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../Settings/store/reducer";
import { Pagination as ReactPaginate } from "../../Pagination";
export const TopRated = () => {
  const { topRatedPage, setTopRatedPage } = useContext(Context);
  const [pageItems, setPageItems] = useState(0)
  const [data, setData] = useState([])
  const selector = useSelector((posts) => posts.Reducer.posts )
  const dispatch = useDispatch()
  const getHandleTopRated = useCallback(async () => {
    const request = await getApi.getTopRated(topRatedPage);
    const response = await request.data;
    setPageItems(response.total_pages)
    setData(response)    
  }, [topRatedPage]);
  const getMovieTop = useCallback(async () => {
    const request = await getApi.getTopRated(topRatedPage+1)
    const response = await request.data
    dispatch(Action.setPosts(response?.results))
  },[topRatedPage])
  useEffect(() => {
    getHandleTopRated()
  }, [getHandleTopRated])
  useEffect(() => {
      getMovieTop()
},[getMovieTop])

return (
    <div className="top_rated">
      <div className="container_fluid">
        <div className="home_page_title">
          <h1>Top Rated</h1>
        </div>
        <div className="top_rates_carousel">
          {data?.results?.length ? (
            <Swiper style={{marginTop: "1rem"}}   
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={100}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>
                {data?.results?.map(item => {
                    return(
                        <SwiperSlide>
                            <MovieCarousel likes={false} item={item} id={item.id} img={BASE_IMAGE+item.backdrop_path} name={item.title} year={item.release_date}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
          ): null}
          <div className="top_rated_movies">
                {selector?.map(item => {
                    return(
                        <MovieCarousel likes={true}  item={item} id={item.id} img={BASE_IMAGE+item.backdrop_path} name={item.title} year={item.release_date}/>
                    )
                })}
          </div>
        </div>
      <ReactPaginate page={topRatedPage} pageCount={pageItems !== 0 ? pageItems :  0} setPage={setTopRatedPage}/>
      </div>
    </div>
  );
};
