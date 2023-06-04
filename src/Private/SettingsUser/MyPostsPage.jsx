import "./Settings.css"
import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../../Settings"
import axios from "axios"
import { PostMan } from "./PostMan"

export const MyPostPage = () => {
    const {user} = useContext(Context)
    const [data, setData] = useState([])
    const getHandlePosts = useCallback(async () => {
        const request = await axios.get(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/posts?user_id=${user.id}`)
        const response = await request.data
        setData(response)        
    },[user.id])
    useEffect(() => {
        getHandlePosts()
    },[getHandlePosts])
    return(
        <div className="my__posts_page">
            {data?.map(item => {
                return(
                    <PostMan avtor={item.avtor} body={item.body} handleGetPosts={getHandlePosts} id={item.id} postsAll={false}  title={item.title} user_id={item.user_id} />
                )
            })}
        </div>
    )
}