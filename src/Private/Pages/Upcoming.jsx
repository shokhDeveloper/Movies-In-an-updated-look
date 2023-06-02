import { useCallback, useContext, useEffect, useState } from "react";
import { BASE_IMAGE, Context, getApi } from "../../Settings";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper"
import  "swiper/swiper-bundle.min.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { MovieCarousel } from "../../Page_Items";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../Settings/store/reducer";
import { Pagination as ReactPaginate } from "../../Pagination";
export const Upcoming = () => {
  const { upcomingPage, setUpcomingPage } = useContext(Context);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const selector = useSelector((posts) => posts.Reducer)
  const dispatch = useDispatch()
  const getHandleUpComing = useCallback(async () => {
    const request = await getApi.getUpcoming(upcomingPage);
    const response = await request.data;
    setPageCount(response.total_pages)
    setData(response);
}, [upcomingPage]);
const getUpComingMovies = useCallback(async () => {
    const request = await getApi.getUpcoming(upcomingPage+1);
    const response = await request.data;
    dispatch(Action.setPosts(response?.results))
  },[upcomingPage])
  useEffect(() => {
    getHandleUpComing();
  }, [getHandleUpComing]);
  useEffect(() => {
    getUpComingMovies()
  },[getUpComingMovies])
  return (
    <div className="upcoming">
      <div className="container_fluid">
        <div className="home_page_title">
            <h1>Upcoming Movies</h1>
        </div>
      <Swiper style={{marginTop: "1rem"}}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
            {data?.results?.map(item => {
                return(
                    <SwiperSlide>
                        <MovieCarousel id={item.id} img={BASE_IMAGE + item.backdrop_path} item={item} likes={false} name={item?.title?.split(" ").length > 2 ? `${item?.title?.split(" ")?.slice(0, 2).join(" ")} ... `: item.title} year={item.release_date} key={item.id}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
            {selector?.posts?.length ?  (
                <div className="upcoming_movies">
                      {selector?.posts?.map(item => {
                        return(
                            <MovieCarousel likes={true} item={item} id={item.id} img={BASE_IMAGE+item.backdrop_path} name={item.title} year={item.release_date} key={item.key}/>
                        )
                      })}  
                </div>
            ): null}
        <ReactPaginate pageCount={pageCount} setPage={setUpcomingPage}/>
      </div>
    </div>
  );
};
