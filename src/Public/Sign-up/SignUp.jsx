import "./Signup.css"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { Btn, Context, Input, LabelText, SubmitterBtn } from "../../Settings"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {signInWithPopup} from "firebase/auth"
import { auth, Provider } from "../Sign-in/config"
import * as Yup from "yup"
import axios from "axios"
import { useMutation } from "react-query"
export const SignUp = () => {
    const date = new Date()
    const navigate = useNavigate()
    const [focus, setFocus] = useState(true)
    const [state, setState] = useState("sign-up__title")
    const passwordRef = useRef()
    const {setUser, setToken} = useContext(Context)
    const {mutate} = useMutation(data => {
        axios({
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            data,
            url: `http://localhost:7777/register`
        }).then((response) => {
            if(response.status === 201){
                const {user, accessToken} = response.data
                if(accessToken !== null || accessToken !== undefined){
                    setToken(accessToken)
                    setUser(user)
                    navigate("/")
                }
            }
        })
    })
    const handleKey = event => {
        if(event.keyCode === 27){
            navigate(-1)
        }
    }
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => window.removeEventListener("keyup", handleKey)
    },[])
    const validationSchema = Yup.object({
        name: Yup.string().required("Ism majburiy"),
        lastname: Yup.string().required("Familya majburiy"),
        email: Yup.string().email("Email xato").required("Email majburiy"),
        password: Yup.string().min(3 , "Min 3").max(15, "Max 15").required("Password majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
        values:{
            name: "",
            lastname: "",
            email: "",
            password: ""
        },
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    })
    const onSubmit = async event => {
        mutate({...event, date: `${date.toLocaleString()} Register it's user` })
    }
    useEffect(() => {
        if(errors?.name && errors?.lastname && errors?.email && errors?.password ){
            setState("sign-up__title_error")
        }else{
            setState("sign-up__title")    
        }
    },[errors.name, errors.lastname, errors.email, errors.password])
    const handleClick = () => {
        signInWithPopup(auth, Provider).then((data) => {
            const {user}  = data
            setToken(user.accessToken)
            setUser(user)
            navigate("/")
        })
    }
    watch()
    return(
        <div className="sign-up">
            <div className="container_fluid">
                <h1 className={state}>Sign up</h1>
                <form className="sign-up__form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">
                        <LabelText className="sign-up__label" variant={errors?.name? "error": "default"} >{errors?.name? errors?.name?.message: "Name"}</LabelText>
                        <Input id="name" variant={errors?.name? "error": "default"} placeholder="Name" {...register("name")}/>
                    </label>
                    <label htmlFor="lastname">
                        <LabelText className="sign-up__label" variant={errors?.lastname? "error": "default"}>{errors?.lastname? errors?.lastname?.message: "LastName"}</LabelText>
                        <Input id="lastname" variant="default" placeholder="Lastname" {...register("lastname")}/>
                    </label>
                    <label htmlFor="email">
                    <LabelText className="sign-up__label" variant={errors?.email? "error": "default"}>{errors?.email? errors?.email?.message: "Email"}</LabelText>
                        <Input id="email" variant={errors?.email? "error": "default"} placeholder="Email" {...register("email")}/>
                    </label>
                    <LabelText onClick={() => {
                        setFocus(!focus)    
                    }} className="sign-up__label" variant={errors?.password? "error": "default"}>{errors?.password? errors?.password?.message : "Password"}</LabelText>
                    
                    <label className="sign-up__password"  htmlFor="password" style={{background: "#fff"}}>
                        <Input variant="default" ref={passwordRef} type={focus? "password": "text"} {...register("password")} autoFocus={focus}  id="password" placeholder="Password"/>
                        <span>
                            {focus ? (
                                <EyeOutlined onClick={() => setFocus(!focus)}/>
                            ):  (
                                <EyeInvisibleOutlined onClick={() => setFocus(!focus)}/>
                            )}
                        </span>
                    </label>
                    <SubmitterBtn variant="gold">Yuborish</SubmitterBtn>
                    <Btn variant="google" className="google" onClick={handleClick}>Google orqali kirish</Btn>
                </form>
            </div>
        </div>
    )
}