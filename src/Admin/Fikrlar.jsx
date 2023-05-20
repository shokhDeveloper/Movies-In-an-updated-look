import { useCallback, useContext } from "react"
import { Context } from "../Settings"
import axios from "axios"
import { useQuery } from "react-query"
import { FikrlarCharts } from "../Charts/FikrlarCharts"

export const Fikrlar = () => {
    const {user} = useContext(Context)
    const getPosts = useCallback(async () => {
        const request = await axios.get(`http://localhost:7777/posts`)
        const response = await request.data
        return response
    },[user.id])
    const {isLoading, isError, isSuccess, data} = useQuery("/posts", getPosts)
    return(
        <div className="admin_fikr">
            {isLoading ? (
                <h1>Yuklanmoqda</h1>
            ): null}
            {isError ? (
                <h1>Xatolik</h1>
            ): null}
            {isSuccess ? (
                <FikrlarCharts posts={data}/>
            ): null}
        </div>
    )
}