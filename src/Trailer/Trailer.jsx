import "./Trailer.css"
import { useCallback, useEffect, useState } from "react"
import { getApi } from "../Settings"
import YouTube from "react-youtube"
export const Trailer = ({id}) => {
    const [videoId, setVideoId] = useState("")
    const handleGetVideo = useCallback(async () => {
        const request = await getApi.getVideos(id)
        const response = await request.data
        setVideoId(response?.results[1]?.key)
    },[id])
    useEffect(() => {   
        handleGetVideo()
    },[handleGetVideo])
    return(
        <div className="movie_page_trailer_items" id="trailer">
            <div className="container_fluid">
            {videoId ? (
                <YouTube videoId={videoId}/>
            ): null}
            </div>
        </div>
    )
}