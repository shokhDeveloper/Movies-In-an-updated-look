import { createContext, useEffect, useState } from "react";
import { getItem, setItem } from "../Locals";

export const Context = createContext()
const {Provider} = Context
export const ContextProvider = ({children}) => {
    const locals = getItem("token")
    const [token, setToken] = useState(locals ? locals: null)
    useEffect(() => {
        if(token !== null){
            setItem("token_portal", token)
        }
    },[token])
    const locals_user = getItem("user_portal")
    const [user, setUser] = useState(locals_user ? JSON.parse(locals_user): null)
    useEffect(() => {
        if(user !== null){
            setItem("user_portal", user)
        }
    },[user])
    const languageLocals = getItem("language_portal")
    const [language, setLanguage] = useState(languageLocals ? languageLocals: "uz")
    const [auto, setAuto] = useState(true)
    const [activeHeader, setActiveHeader] = useState("public_header")
    const [text, setText] = useState("public_hero_texts")
    const [crick, setCrick] = useState(false)
    const [state, setState] = useState("")
    const [textNode, setTextNode] = useState({
        hero:false,
        avtor: true
    })
    return(
        <Provider value={{ textNode, setTextNode, state, setState, crick, setCrick,text, setText, activeHeader, setActiveHeader,auto , setAuto, language, setLanguage,token, setToken, user, setUser}}>
            {children}
        </Provider>
    )
}