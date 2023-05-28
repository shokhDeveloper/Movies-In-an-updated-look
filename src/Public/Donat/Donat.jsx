import { useForm } from "react-hook-form"
import "./Donat.css"
import { useMutation } from "react-query"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Modal } from "../../Modal"
export const Donat = () => {
    const date = new Date()
    const [modal, setModal] = useState(false)
    const [text, setText] = useState(`ShokhDeveloper ga ishonganingiz uchun ming bora tashakkur ! Salomat bo'ling hurmatli`.split(" "))
    const [donatMan, setDonatMan] = useState("")
    const cardRef = useRef()
    const summaRef = useRef()
    const whoRef = useRef()
    const validationSchema = Yup.object({
        card: Yup.string().required("Carta raqami majburiy"),
        summa: Yup.string().required("summa kiritish majburiy"),
        who: Yup.string().required("Kim ekanligingizni kiritish majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit, reset} = useForm({
        values: {
            card: "",
            summa: "",
            who: ""
        }, 
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    })
    const mutation = useMutation(data => {
        axios.post("http://localhost:7777/donats", data).then((response) => {
            if(response.status === 201){
                setDonatMan(response?.data?.who)
                reset({
                    card: "",
                    summa: "",
                    who: ""
                })
            }   
        })
    })
    const onSubmit = event => {
        mutation.mutate({...event, summa: `${event.summa} so'm`,  date: `${date.toLocaleString()} Yuborildi` })
    }
    useEffect(() => {
        if(donatMan !== ""){
            setText((text) => [...text, donatMan])
            setModal(true)
        }
    },[donatMan])
    watch()
    return(
        <div id="donat">
            <div className="container_fluid">
                <h1>Donat qilmoqchimisiz ? </h1>
                <div className="donat_form_items">
                <form className="donat_form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="karta">
                        <input ref={cardRef} pattern="\d{16}"  type="string" {...register("card")} className="card_input" placeholder="Card" />
                        <p className="error_text">{errors?.card? errors?.card?.message: null}</p>
                    </label>
                    <label style={{background: "#fff"}} className={errors?.summa ? "error_label": null} htmlFor="summa">
                        <input ref={summaRef} type="string" placeholder="Summa" {...register("summa")} id="summa" />
                        <span>So'm</span>
                    </label>
                    <label htmlFor="who">
                        <input ref={whoRef} style={{border: errors?.who? "2px solid crimson": "2px solid transparent"}} {...register("who")} id="who" type="text" className="who" placeholder="Kimdan" />
                        <p className="error_text">{errors?.who? errors?.who?.message: null}</p>
                    </label>
                    <button>Yuborish</button>
                </form>
                </div>
            </div>
            <Modal donatMan={donatMan} modal={donatMan !== "" ? modal : false} setModal={setModal} title={"Donat muvaffaqiyatli amalga oshirildi"} disc={text}/>
        </div>
    )
}