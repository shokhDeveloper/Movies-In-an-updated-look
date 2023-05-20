import "./SignIn.css"
import { Btn, Context, Input, LabelText, SubmitterBtn } from "../../Settings"
import { auth, Provider } from "./config"
import {signInWithPopup} from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { useFormik } from "formik"
import {EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import * as Yup from "yup"
import { useLocation, useNavigate } from "react-router"
import axios from "axios"
import { useMutation } from "react-query"
import { Modal } from "../../Modal"
export const SignIn = () => {
    const date = new Date()
    const {setToken, setUser} = useContext(Context)
    const [modal, setModal] = useState(!true)
    const [titleClass, setTitleClass] = useState("sign-in-title")
    const [type, setType] = useState(false)
    const [nazad, setNazad] = useState(false)
    const {isLoading, isError, isSuccess, mutate} = useMutation(data =>{
        axios.post("http://localhost:7777/login", data).then((response) => {
            if(response.status === 200){
                let {accessToken, user} = response.data
                if(accessToken !== null ||  accessToken !== undefined){
                    setToken(accessToken)
                    setUser(user)
                }
            }
        }).catch((error) => {
            if(error){
                setModal(true)
                setTimeout(() => {
                    setModal(false)
                }, 4000)    
            }
        })
    })
    const formik = useFormik({
        initialValues: {
            email:"",
            password: "" 
        },
        onSubmit(event){
            mutate({...event, date: `${date.toLocaleString()} Login in useer`})
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email xato").required("Email kiritish majburiy"),
            password: Yup.string().min(3, "Min 3").max(15, "Max 15").required("Parol kiritish majburiy")
        })
    })
    const handleClick = () => {
        signInWithPopup(auth, Provider).then((data) => {
            const {user} = data
            setToken(user.accessToken)
            setUser(user)
        })
    }
    useEffect(() => {
        if(formik?.errors?.email && formik?.errors?.password){
            setTitleClass("sign-in-error-title")
        }else{
            setTitleClass("sign-in-title")
        }
    },[formik?.errors])
    const handleKey = event => {
        if(event.keyCode === 27){
            window.location.reload()
        }
    }
   
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => window.removeEventListener("keyup", handleKey)
    },[])
    return(
        <div className="sign-in">
            <div className="container_fluid">
                <h1 className={titleClass}>Sign in Movies</h1>
                <form className="sign-in-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">
                        <p>
                        <LabelText variant={formik?.errors?.email? "error" : "default" }>{formik?.errors?.email? formik.errors.email : "Email" }</LabelText>
                        </p>
                        <Input {...formik.getFieldProps("email")} variant={formik?.errors?.email? "error" : "default"} id="email" placeholder="Email"/>
                    </label>
                    <p>
                        <LabelText variant={formik?.errors?.password? "error": "default"}>{formik?.errors?.password? formik?.errors?.password: "Password" }</LabelText>
                    </p>
                    <label htmlFor="password" style={{outline: formik?.errors?.password? "2px solid crimson": "2px solid transparent"}}>    
                        <Input type={type === false ? "password": "text"} {...formik.getFieldProps("password")} variant={"default" } id="password" placeholder="Password"/>
                        {type ? (
                            <EyeOutlined onClick={() => setType(!type)}/>
                            ):(
                            <EyeInvisibleOutlined onClick={() => setType(!type)}/>
                        )}
                    </label>
                    <SubmitterBtn variant="gold" className="submit">Yuborish</SubmitterBtn>
                </form>
            <Btn variant="google" className="google" style={{margin: "0 auto"}} onClick={handleClick}>Google orqali kirish</Btn>
            </div>
            <Modal title={"Xatolik"} error_text={"Mavjud bo'lmagan userni kiritdingiz !"} modal={modal} setModal={setModal}/>
        </div>
    )
}