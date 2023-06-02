import { useCallback, useContext, useEffect, useState } from "react"
import { BASE_IMAGE, Context, getApi } from "../../Settings"
import { A11y, Navigation, Pagination, Scrollbar } from "swiper"
import { SwiperSlide, Swiper } from "swiper/react"
import { MovieCarousel } from "../../Page_Items"
import { useDispatch, useSelector } from "react-redux"
import { Action } from "../../Settings/store/reducer"
import {Pagination as ReactPaginate} from "../../Pagination"
export const NowPlaying = () => {
    const {nowPlayingPage, setNowPlayingPage} = useContext(Context)
    const {posts} = useSelector((posts) => posts.Reducer)
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const handleGetNowPlaying = useCallback( async () => {
        const request = await getApi.getNowPlaying(nowPlayingPage)
        if(request.status === 200){
            setPageCount(500-1)
        }
        const response = await request.data
        setData(response)
    },[nowPlayingPage])
    const handleGetNowPlayingMovies = useCallback(async () => {
        const request = await getApi.getNowPlaying(nowPlayingPage+1)
        const response = await request.data
        dispatch(Action.setPosts(response?.results))    
    },[nowPlayingPage])
    useEffect(() => {
        handleGetNowPlaying()
        handleGetNowPlayingMovies()
    },[handleGetNowPlaying])
    return(
        <div className="now_playing">
            <div className="container_fluid">
                <div className="home_page_title">
                    <h1>Now playing Movies</h1>
                </div>
                <div style={{marginTop: "1rem"}} className="now_playing_movies_carousel">
                    {data?.results?.length ? (
                        <Swiper 
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        >
                            {data?.results?.map(item => {
                                return(
                                    <SwiperSlide>
                                        <MovieCarousel likes={false} item={item} id={item.id} img={BASE_IMAGE+item.backdrop_path} name={item.title} year={item.release_date}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    ): null}
                </div>            
                <div className="now_playing_movies">
                    {posts?.map(item => {
                        return(
                            <MovieCarousel likes={true} id={item.id} img={BASE_IMAGE+item.backdrop_path} item={item} name={item.title} year={item.release_date} key={item.key}/>
                        )
                    })}
                </div>
                <ReactPaginate pageCount={pageCount} setPage={setNowPlayingPage}/>
            </div>
        </div>
    )
}