import { useCallback, useEffect, useState } from "react"
import { getApi, api_key, BASE_IMAGE } from "../../Settings"
import axios from "axios"
import { MovieCarousel } from "../../Page_Items"

export const CreditMovies = ({id}) => {
    const [personID, setPersonID] = useState(0)
    const [data, setData] = useState([])
    const [name, setName] = useState()
    const getCredit = useCallback(async () => {
        const request = await getApi.getCredit(id)
        const response = await request.data
        setName(response?.person?.name)
        setPersonID(response?.person?.id)
    },[id])
    useEffect(() => {
        getCredit()
    },[getCredit])
    const getCreditMovies = useCallback(async () => {
        if(personID !== 0){
            const request = await getApi.getCreditMovies(personID)
            const response = await request.data
            setData(response.cast)
        }
    },[personID]) 
    useEffect(() => {
        getCreditMovies()
    },[getCreditMovies])
    return(
        <div className="credit_movies_page">
            <div className="home_page_title">
                <h1>{name} <span className="white">ro'l oynagan filmlar</span> </h1>
            </div>
            <div className="credit_movies_page_items">
                {data?.map(item => {
                    return(
                        <MovieCarousel likes={true} id={item.id} img={item.poster_path} item={item} name={item.title} year={item.release_date} key={item.id}/>
                    )
                })}
            </div>
        </div>
    )
}