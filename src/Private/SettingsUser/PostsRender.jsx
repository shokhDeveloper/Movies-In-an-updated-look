import React, { useContext } from "react"
import { Btn, Context } from "../../Settings"
import { MyPost } from "./MyPost"
import { PostMan } from "./PostMan"

export const PostsRender = ({data, handleGetPosts}) => {
    return(
        <>
        {data?.length ? (
        <div className="posts__items">
            
            {data?.map(item => {
                return(
                    <PostMan postsAll={true} title={item.title} body={item.body} avtor={item.avtor} handleGetPosts={handleGetPosts} id={item.id} user_id={item.user_id} />
                )
            })}
        </div>

        ): (
            <h1 className="error_text">Hali Postlar mavjud emas</h1>
        )}
        </>
    )
}