import "./Settings.css"
import { useCallback, useContext, useEffect, useState } from "react"
import { Modal } from "../../Modal"
import { Btn, Input, LabelText, SubmitterBtn } from "../../Settings/Styled"
import { useForm } from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup"
import { PostsRender } from "./PostsRender"
export const Posts = ({handleGetPosts, data}) => {   
    return(
        <div className="posts__page">
            
            <PostsRender handleGetPosts={handleGetPosts} data={data}/>
            
        </div>
    )
}