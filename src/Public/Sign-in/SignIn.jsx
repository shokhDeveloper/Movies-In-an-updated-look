import "./SignIn.css"
import { Btn, Input, LabelText, SubmitterBtn } from "../../Settings"
import { auth, Provider } from "./config"
import {signInWithPopup} from "firebase/auth"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import {EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import * as Yup from "yup"
export const SignIn = () => {
    const [value, setValue] = useState()
    const [titleClass, setTitleClass] = useState("sign-in-title")
    const [type, setType] = useState(false)
    const formik = useFormik({
        initialValues: {
            email:"",
            password: "" 
        },
        onSubmit(event){
            console.log(event)
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email xato").required("Email kiritish majburiy"),
            password: Yup.string().min(3, "Min 3").max(15, "Max 15").required("Parol kiritish majburiy")
        })
    })
    const handleClick = () => {
        signInWithPopup(auth, Provider).then((data) => {
            console.log(data)
            setValue(data.user.email)
        })
    }
    useEffect(() => {
        if(formik?.errors?.email && formik?.errors?.password){
            setTitleClass("sign-in-error-title")
        }else{
            setTitleClass("sign-in-title")
        }
    },[formik?.errors])
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
                <button onClick={handleClick}>Sign with google </button>
            </div>
        </div>
    )
}