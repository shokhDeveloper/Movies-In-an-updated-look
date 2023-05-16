import { Link, useNavigate } from "react-router-dom"
import Logo from "../../Settings/assets/images/logo.png"
import { Btn } from "../../Settings/Styled/Styled"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../Settings/Context/Context"
import { Fade } from "react-reveal"
import Reveal from "react-reveal/Reveal"
export const Hero = () => {
    const [text, setText] = useState(true)
    const {activeHeader, crick, setTextNode} = useContext(Context)
    const navigate = useNavigate()
    let loremRef = useRef()
    const [state, setState] = useState("Hello, My name is ShokhDeveloper and I am a Front-end Developer and I studied at Najot ta'lim. My knowledge is HTML + CSS, SASS, Bootstrap, Javascript (Ecmascript 6), Git Github, React, Redux !".split(" "))
    const handleClick = event => {
        if(event.target.matches(".register_btn")){
            navigate("/register")
        }
    }
    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    },[])
    let idx = 0 
    const Typing = () => {
         if(state.length > idx){
            idx++
            loremRef.current.innerHTML += state[idx] === "ShokhDeveloper" && state.splice(idx, 1)  ? ` <span style="color: goldenrod";>ShokhDeveloper</span>`:  ` ${state[idx-1]} ` 
            setTimeout(Typing, 100)
        }else{
            setTextNode({
                hero: true,
                avtor: true
            })
        }
    }
    useEffect(() => {
            if(state.length > idx && text === true && crick === true){
                loremRef.current.innerHTML = null
                Typing()
            }else{
                console.log("Tugadi")
            }
    },[crick])
    const handleScroll = event => {
        if(window.scrollY > 0) return setText(false)
        setText(true)
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])
    return(
        <section className="public_hero" style={{transform: text === true ? "translateX(0%)": "translateX(-100%)", opacity: text === true ? "1": ".9" }} >
            <div className="container_fluid">
                <Fade left>
                <div className={"public_hero_texts"} style={{transition: "0.5s ease all"}}>
                    <Link className="public_hero_link">
                        Welcome to my world of movies
                        <div className="animated_text" >
                            <h3>Developer</h3>
                            <h3>Javascript</h3>
                            <h3>React</h3>
                            <h3 style={{color: "goldenrod"}}>ShokhDeveloper</h3>
                         </div>
                    </Link>
                        <h3 ref={loremRef} className="public_lorem">
                        Hello, My name is ShokhDeveloper and I am a Front-end Developer and I studied at Najot ta'lim. My knowledge is HTML + CSS, SASS, Bootstrap, Javascript (Ecmascript 6), Git Github, React, Redux !
                        </h3>
                    <Btn className="register_btn" variant="gold" onClick={() => {
                        navigate("/sign-in")
                    }}>Getting Started</Btn>
                </div>
                </Fade>
            </div>
        </section>
    )
}