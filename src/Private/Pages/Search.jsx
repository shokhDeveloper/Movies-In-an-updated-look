import "./Search.css"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { BASE_IMAGE, getApi } from "../../Settings"
import { useDispatch, useSelector } from "react-redux"
import { Action } from "../../Settings/store/reducer"
import { MovieCarousel } from "../../Page_Items"

export const Search = () => {
    const {text, searchPage}  = useParams()
    const [error, setError] = useState(false)
    const selector = useSelector((posts) => posts.Reducer)
    const dispatch = useDispatch()
    const handleSearchMovie = useCallback(async () => {
        const request = await getApi.getSearch(text, searchPage).catch(error => {
            setError(true)
        })
        if(request.status === 200){
            const response = await request.data
            dispatch(Action.setPosts(response.results))
        }
    },[text, searchPage])
    useEffect(() => {
        handleSearchMovie()
    },[handleSearchMovie])
    useEffect(() => {
        console.log(error)
    },[error])
    return(
        <div className="search_movie_page">
            <div className="container_fluid">
                <div className="home_page_title">
                    <h1>Search Movies</h1>
                </div>
                <div className="search_page_movies">
                    {selector?.posts?.map(item => {
                        return(
                            <MovieCarousel likes={true} name={item.title} id={item.id} img={BASE_IMAGE+item.backdrop_path} item={item} year={item.release_date} key={item.id}/>
                            )
                        })}
            {error ? (
                <h1>Bunday Movie mavjud emas</h1>
            ): null}
                </div>
            </div>
        </div>
    )
}