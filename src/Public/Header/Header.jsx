import "./Header.css"
import Logo from  "../../Settings/assets/images/logo.png"
import { Link, NavLink, useNavigate} from "react-router-dom"
import { LoginOutlined, ExportOutlined  } from "@ant-design/icons"
import { useContext, useEffect, useState } from "react"
import { Context } from "../../Settings/Context/Context"
export const Header = () => {
    const {setAuto, setActiveHeader, state, setState ,activeHeader, setTextNode, textNode} = useContext(Context)
    const navigate = useNavigate()
    const handleScroll = () => {
        if(window.scrollY > 10){
            setActiveHeader("public_active_header")
            setAuto(false)
        }else{
            setActiveHeader("public_header")
            setAuto(true)
        }
    }
    useEffect(() => {
        if(state === "#home"){
            console.log("ishladi")
            setAuto(true)
        }
    },[state])
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])   
    return(
        <header className={activeHeader} id="home">
            <nav className="public_nav">
                <div className="container_fluid">
                    <div className="public_nav_align">
                        <div className="public_header_start">
                        <Link className="public_nav_logo" to={"/"}>
                            <img src={Logo} alt="Logo Movies" />
                        </Link>
                        <ul className="public_nav_ul">
                            <li>
                                <a href="#home" onClick={() =>  setState("#home")} className={state === "#home" ? "public_active_page": "public_page"}>Bosh sahifa</a>
                            </li>
                            <li>
                                <a onClick={() => setState("#about") } href="#about" className={state === "#about" ? "public_active_page": "public_page"}>Dastur haqida</a>
                            </li>
                            <li>
                                <a href="#avtor" onClick={() => {
                                    setState("#avtor")
                                    setTextNode({
                                        hero: true,
                                        avtor: false
                                    })
                                }} className={state === "#avtor" ? "public_active_page": "public_page"}>Avtor</a>
                            </li>
                            <li>
                                <a href="#donat" onClick={() => setState("#donat")} className={state === "#donat" ? "public_active_page": "public_page"}>Donat</a>
                            </li>
                        </ul>
                        </div>
                        <ul className="public_header_end">
                           <li className="sign">
                                <a href="#kirish">Kirish</a>
                                <ul className="public_header_bar">
                                    <li>
                                        <a   onClick={() => {
                                             if(textNode.hero === true && textNode.avtor === true ){
                                                navigate("/sign-in")
                                            }else{
                                                console.log("false")
                                            }
                                        }}>Sign in <LoginOutlined/> </a>
                                    </li>
                                    <li>
                                        <a onClick={() => {
                                              if(textNode.hero === true && textNode.avtor === true ){
                                                navigate("/sign-up")
                                            }else{
                                                console.log("false")
                                            }
                                        }}>Sign up <ExportOutlined/> </a>
                                    </li>
                                    <li>
                                        <Link to={"/public-posts"}> Fikrlar</Link>
                                    </li>
                                </ul>
                            </li> 
                        </ul>
                    </div>
                </div>
            </nav>           
        </header>
    )
}