import axios from "axios";
import { Btn, Context, Input, LabelText, SubmitterBtn } from "../../Settings"
import { useContext, useEffect, useState } from "react";
import { Modal } from "../../Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
export const MyPost = ({id, handleGetPosts, post_id}) => {
    const date = new Date()
    const [updatePost, setUpdatePost] = useState(false)
    const [data, setData] = useState()
    const {user} = useContext(Context)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/posts/${post_id}`).then((response) => response.json()).then(data => setData(data) )
    },[id])
    const validationSchema = Yup.object({
        title: Yup.string().required("Title Mmajburiy"),
        body: Yup.string().required("Title majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
        values:{
            title: data?.title,
            body: data?.body
        },
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    }) 
    const onSubmit = async (event) => {
        const request = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/posts/${post_id}`,
            headers:{
                "Content-Type": "application/json"
            },
            data: {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Create-it its post`, user_id: user.id, avtor: `${user.name} ${user.lastname}`}
        })
        if(request.status === 200){
            setUpdatePost(false)
            handleGetPosts()
        }
        const response = await request.data
        console.logg(response)
    }
    const handleClick =  (event) => {
        switch(event.target.id){
            case "update":{
                setUpdatePost(!updatePost)
            }break;
            case "delete":{
                    axios.delete(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/posts/${post_id}`).then(response => {
                        if(response.status === 200){
                            handleGetPosts()
                        }
                    })
            }
        }
    }
    watch()
    return(
        <div className="my_post">
            <Btn variant="gold" id="update" onClick={handleClick}>Yangilash</Btn>
            <Btn variant="crimson" id="delete" onClick={handleClick}> O'chirish  </Btn>
            <Modal disc={null} error_text={null} modal={updatePost} setModal={setUpdatePost} title={"Postni yangilash"}>
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
        </div>
    )
}