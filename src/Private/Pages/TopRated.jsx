import { useCallback, useContext, useEffect } from "react"
import {Context} from "../../Settings"
import {getApi} from "../../Settings"
export const TopRated = () => {
    const {user, popularPage}  = useContext(Context)
    const getHandleTopRated = useCallback(async() => {
        const request = await getApi.getTopRated(popularPage)
        const response = await request.data
        console.log(response) 
    },[user.id])
    useEffect(() => {
        getHandleTopRated()
    },[getHandleTopRated])
    return(
        <div>
            <div className="container_fluid">
                <h1>Top rated</h1>
            </div>
        </div>
    )
}