import { useCallback, useContext, useEffect, useState } from "react"
import { Context, getApi } from "../../Settings"

export const Popular = () => {
    const {user} = useContext(Context)
    const [data, setData] = useState([])
    const getPopular = useCallback(async () => {
        const request = await getApi.getPopular(1)
        const response = await request.data
        setData(response)
    },[user.id])
    useEffect(() => {
        getPopular()
    },[getPopular])
    return(
        <div>
            <div className="container_fluid">
                <h1>Popular</h1>
            </div>
        </div>
    )
}