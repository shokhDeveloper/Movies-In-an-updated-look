import "./Settings.css"
import { useCallback, useContext, useEffect, useState } from "react"
import { Context, Input, LabelText, PasswordInput, SubmitterBtn } from "../../Settings"
import {EyeOutlined, EditOutlined} from "@ant-design/icons"
import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { Modal } from "../../Modal"
export const User = () => {
    const date = new Date()
    const {user:{id}} = useContext(Context)
    const [data, setData] = useState([])
    const [type, setType] = useState("text")
    const [edit, setEdit] = useState(false)
    const [modal, setModal] = useState(false)
    const [text, setText] = useState("Muvaffaqiyatli yangilandi hurmatli ".split(" "))
    const [donatMan, setDonatMan] = useState("")
    const handleGetUser = useCallback(async () => {
        const request = await axios.get(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/users/${id}`)
        const response =  await request.data
        setData([response])
    },[id])
    useEffect(() => {
        handleGetUser()
    },[handleGetUser])
    const validationSchema = Yup.object({
        name: Yup.string().required("Ism majburiy"),
        lastname: Yup.string().required("Familya majburiy"),
        email: Yup.string().email("Email xato").required("Email majburiy"),
        password: Yup.string().min(3 ,"Min 3").max(15, "Max 15").required("Password majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
        values: {
            name: data?.length ? data[0].name: null,
            lastname: data?.length ? data[0].lastname: null,
            email: data?.length ? data[0].email: null,
            password: "Password"
        },
        mode: "onChange",
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (event) => {
        const request = await axios.put(`${process.env.REACT_APP_JSON_SERVER_LOCALHOST}/users/${id}`,{
            ...event,
            date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Yangilandi`,
            status: "published"
        })
        if(request.status === 200){
            setModal(true)
            setEdit(false)
        }
        const response = await request.data
        setDonatMan(response.name, response.lastname)
        return response    
    }
    watch()
    return(
        <div className="user_settings">
            <div className="user_settings_items">
                 <form id="form" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name"> 
                            <LabelText className="label" variant={errors?.name ? "error": "default"}>{errors?.name ? errors.name?.message: "Ism"}</LabelText>
                            <Input {...register("name")} readOnly={edit === true ? false: true} variant="default" id="name" type="text"  />
                        </label>
                        <label htmlFor="lastname">
                            <LabelText variant={errors?.lastname ? "error": "default"}>{errors?.lastname ? errors.lastname?.message: "Familya"}</LabelText>
                            <Input {...register("lastname")} readOnly={edit === true ? false: true} id="lastname" variant={"default"} />
                        </label>
                        <label htmlFor="email">
                            <LabelText variant={errors?.email ? "error": "default"}>{errors?.email? errors?.email.message: "Email"}</LabelText>
                            <Input {...register("email")} readOnly={edit === true ? false: true} id="email" variant="default"/>
                        </label>
                        <label htmlFor="password">
                            <LabelText variant={errors?.password? "error": "default"}>{errors?.password? errors?.password?.message: "Password"}</LabelText>
                        </label>
                        <PasswordInput htmlFor="password">
                            <Input {...register("password")} readOnly={edit === true ? false: true} variant="default" defaultValue={"Password"} type={type} id="password" />
                            <EyeOutlined onClick={() => setType((type) => type === "text" ? "password": "text") } id="password" className="eye"/>
                        </PasswordInput>
                    </form>
                        <div className="user_settings_btns">
                        {edit === true ? (
                            <SubmitterBtn disabled={!isValid} form="form" className="submit" variant="gold">Yangilash</SubmitterBtn>
                        ): null}
                        {edit ? (
                           null 
                        ):(
                            <button className="edit" onClick={() => setEdit(!edit)}>Tahrirlash <EditOutlined/></button>
                        )}
                    </div>
            </div>
            <Modal error_text={null} title={"Yangilandi"} disc={text} donatMan={"Leo Messi"}  modal={modal} setModal={setModal} />
        </div>
    )
}