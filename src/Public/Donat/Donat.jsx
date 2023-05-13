import { useForm } from "react-hook-form"
import "./Donat.css"
import { useMutation } from "react-query"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import axios from "axios"
import { useEffect, useState } from "react"
import { Modal } from "../../Modal"
export const Donat = () => {
    const date = new Date()
    let array = ["Salom"]
    const [modal, setModal] = useState(false)
    const [donatMan, setDonatMan] = useState("")
    const validationSchema = Yup.object({
        card: Yup.string().required("Carta raqami majburiy"),
        summa: Yup.string().required("summa kiritish majburiy"),
        who: Yup.string().required("Kim ekanligingizni kiritish majburiy")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
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
            }   
        })
    })
    const onSubmit = event => {
        mutation.mutate({...event, summa: `${event.summa} so'm`,  date: `${date.toLocaleString()} Yuborildi` })
        setDonatMan(event?.who)
    }
    useEffect(() => {
        if(donatMan){
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
                        <input pattern="\d{16}"  type="string" {...register("card")} className="card_input" placeholder="Card" />
                        <p className="error_text">{errors?.card? errors?.card?.message: null}</p>
                    </label>
                    <label style={{background: "#fff"}} className={errors?.summa ? "error_label": null} htmlFor="summa">
                        <input  type="string" placeholder="Summa" {...register("summa")} id="summa" />
                        <span>So'm</span>
                    </label>
                    <label htmlFor="who">
                        <input style={{border: errors?.who? "2px solid crimson": "2px solid transparent"}} {...register("who")} id="who" type="text" className="who" placeholder="Kimdan" />
                        <p className="error_text">{errors?.who? errors?.who?.message: null}</p>
                    </label>
                    <button>Yuborish</button>
                </form>
                </div>
            </div>
            <Modal donatMan={donatMan}  modal={modal} setModal={setModal} title={"Donat muvaffaqiyatli amalga oshirildi"} disc={`ShokhDeveloper ga ishonganingiz uchun ming bora tashakkur ! Salomat bo'ling hurmatli`}/>
        </div>
    )
}