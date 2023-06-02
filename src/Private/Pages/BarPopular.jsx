import { useCallback } from "react"
import { BASE_IMAGE, getApi } from "../../Settings"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

export const BarPopular = ({isSuccess:success}) => {
    const handleGetPopular = useCallback( async () => {
        const request = await getApi.getPopular(2)
        const response = await request.data
        return response?.results
        
    },[success])
    const {isLoading, isError, isSuccess, data} = useQuery("/popular", handleGetPopular)
    return(
        <>
        
         <div className="bar_movies">
             {data?.slice(0,10)?.map(item => {
                return(
                <Link style={{textDecoration: "none"}} to={`/movie/${item.id}`} className="bar_movie">
                    <img src={BASE_IMAGE+item.backdrop_path} alt="Image Movie" />
                    <div className="bar_movie_texts">
                        <h4>{item.title}</h4>
                         <h5>{item.overview.split(" ").length > 3 ? `${item.overview.split(" ").slice(0, 3).join(" ")} ... `: `${item.overview} ...`}</h5> 
                     </div> 
                 </Link>  
                 )
             })} 
         </div>
        </>
    )
}