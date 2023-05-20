import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../Settings"
import { useDispatch, useSelector } from "react-redux"
import { Action } from "../Settings/store/reducer"
import { ColumnCharts } from "../Charts"

export const Foydalan = () => {
    const {user} = useContext(Context)
    const [data, setData] = useState([])
    const {posts} = useSelector((posts) => posts.Reducer)
    const dispatch = useDispatch()
    const getUsers = useCallback(async () => {
        const request = await axios.get(`http://localhost:7777/users`)
        const response = await request.data
        dispatch(Action.setPosts(response))
    },[user.id])    
    useEffect(() => {
        getUsers()
    },[getUsers])
    return(
        <div>
            {posts?.length > 1 ? (
                <ColumnCharts users={posts}/>
            ):null}
        </div>
    )
}