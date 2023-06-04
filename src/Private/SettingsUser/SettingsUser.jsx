import "./Settings.css"
import { Route, Routes, useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import { Btn, Context, Input, LabelText, LinkMovie, SubmitterBtn } from "../../Settings"
import { useCallback, useContext, useEffect, useState } from "react"
import { Posts } from "./Posts"
import { User } from "./User"
import { MyPostPage } from "./MyPostsPage"
import { Modal } from "../../Modal"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"

export const SettingsUser = () => {
    const [state, setState] = useState("") 
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [postsRender, setPostsRender] = useState(false)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const date = new Date()
    const validationSchema = Yup.object({
        title: Yup.string().required("Title Mmajburiy"),
        body: Yup.string().required("Title majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit, reset} = useForm({
        values:{
            title: "",
            body: ""
        },
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (event) => {
        const request = await axios.post(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/posts`, {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Create-it its post`, user_id: user.id, avtor: `${user.name} ${user.lastname}`  })
        if(request.status === 201){
            setModal(false)
            setPostsRender(true)
            reset({
                title: "",
                body: ""
            })
            navigate("posts")
            setState("posts")
            setTimeout(() => {
                setPostsRender(false)
            }, 3000)    
        }
        const response = await request.data
        return response
    }
    const handleGetPosts = useCallback( async () => {
        const request = await axios.get(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/posts`)
        const response = await request.data
        setData(response)
    },[postsRender])
    useEffect(() => {
        handleGetPosts()
    },[handleGetPosts])
    watch()
    return(
        <div className="settings_user">
            <div className="container_fluid">
                <div className="home_page_title">
                    <h1>Sozlamalar</h1>
                </div>
                <div className="settings_user_links">
                    <LinkMovie style={{borderBottom: state === "user" ? "1px solid goldenrod": "1px solid transparent"}} onClick={() => setState("user")} to={"user"}>Akkaunt sozlamalari</LinkMovie>    
                    <LinkMovie onClick={() => setState("posts")} to={"posts"} style={{borderBottom: state === "posts" ? "1px solid goldenrod": "1px solid transparent"}}>Postlar</LinkMovie>
                    <LinkMovie to={"my_posts"} style={{borderBottom: state === "/my_posts" ? "1px solid goldenrod": "1px solid transparent"}} onClick={() => setState("/my_posts")} >My Posts</LinkMovie>
                </div>
                <div className="posts__page_header">
                    <Btn variant="gold" onClick={() => setModal(!modal)}>Post yozish</Btn>
                </div>
                <Modal title={"Post yozish"} disc={null} error_text={null} donatMan={null} modal={modal} setModal={setModal} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">
                        <LabelText variant={errors?.title? "error": "default"}>{errors?.title? errors?.title?.message: "Title"}</LabelText>     
                        <Input {...register("title")} style={{background: errors?.title? "#fff": "#d8d1d1"}} variant={errors?.title? "error": "default"} placeholder="Title yozish"/>
                    </label>
                    <label htmlFor="body">
                        <LabelText variant={errors?.body? "error": "default"}>{errors?.body? errors?.body?.message: "Title"}</LabelText>
                        <Input {...register("body")} placeholder="Body yozish" style={{background: errors?.body? "#fff": "#d8d1d1"}} variant={errors?.body? "error": "default"}/>
                    </label>
                    <label htmlFor="submit" className="submit_label">    
                    <SubmitterBtn id="submit" variant="gold">Yuborish</SubmitterBtn>
                    </label>
                </form>
            </Modal>
                <Routes>
                    <Route index element={<Posts modal={modal} setModal={setModal} handleGetPosts={handleGetPosts} data={data}/>}/>
                    <Route path="/posts" element={<Posts data={data} handleGetPosts={handleGetPosts} modal={modal} setModal={setModal}/>}/>
                    <Route path="/user" element={<User/>}/>
                    <Route path="/my_posts" element={<MyPostPage/>} />
                </Routes>
            </div>
        </div>
    )
}