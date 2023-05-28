import { useQuery } from "react-query"
import { BASE_IMAGE, getApi } from "../../Settings"
import React, { useCallback, useEffect, useState } from "react"
import { BarPopular } from "./BarPopular"
import { Link } from "react-router-dom"
export const Bar = () => {
    const [direktor, setDirektor] = useState(null)
    const getUpcomingMovie = async () => {
        const request = await getApi.getUpcoming(1)
        const response = await request.data
        return [response?.results[2]]
    }
    const {isLoading, isError, isSuccess, data} = useQuery("/now_playing", getUpcomingMovie )
    const getActor = useCallback( async () => {
        const request = await getApi.getCredits(data[0].id)
        const response = await request.data
        setDirektor(response.crew[2])
    },[isSuccess])
    useEffect(() => {
        getActor()
    },[getActor])
    
    return(
        <div className="bar_items">
            {isLoading && (
                <h2>Yuklanmoqda</h2>
            )}
            {isError && (
                <h2 className="error_text">Xatolik</h2>
            )}
            {isSuccess && (
                <React.Fragment>
                    {data?.map(item => {
                        console.log(item)   
                        return(    
                        <Link to={`/movie/${item.id}`} style={{textDecoration: "none"}} className="bar_now_playing">
                            <div className="bar_now_playing_items">
                            <img src={BASE_IMAGE+item.backdrop_path} alt="" />
                            <div className="bar_now_playing_texts">
                                <h3>{item.title}</h3>
                                <h5>{item.overview.split(" ").length > 3 ? `${item.overview.split(" ").slice(0, 3).join(" ")} ... `: item.overview}</h5>
                                <h5><span> Direktor </span> = {direktor ? direktor.name: null }</h5>
                            </div>

                            </div>
                        </Link>
                        )
                    })}
                </React.Fragment>
            )}
            <BarPopular isSuccess={isSuccess}/>
        </div>
    )
}