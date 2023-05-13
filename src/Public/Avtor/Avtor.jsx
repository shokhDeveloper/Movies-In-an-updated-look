import "./Avtor.css"
import AvtorImage from "../../Settings/assets/images/photo_2023-05-11_22-46-43.jpg"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Context } from "../../Settings/Context/Context"
import { useRef } from "react"
export const Avtor = () => {
    const [text, setText] = useState("Hello, My name ShokhDeveloper and I am a Front-end Developer and I studied at Najot ta'lim. My knowledge is HTML + CSS, SASS, Bootstrap, Javascript (Ecmascript 6), Git Github, React, Redux ! I am the second child in the family and I keep my age a secret. I mainly work in Javascript programming language and am currently continuing to learn Typescript programming language. I live in Samarkand region of Uzbekistan and continue my career at Empire IT Academy. And in the future, I will still be the strongest programmer !".split(" "))
    const {state} = useContext(Context)
    const [typing, setTyping] = useState(false)
    let [idx, setIdx] = useState(0)
    const textRef = useRef()
    let disc = document.querySelector(".public_avtor_disc")
    const Typing = () => {
        let disc = document.querySelector(".public_avtor_disc")
        setTyping(true)
        if(text.length > idx){
            disc.innerHTML += text[idx] === "ShokhDeveloper"  ? ` <span style="color: goldenrod;">ShokhDeveloper</span> ` : ` ${text[idx]} `  
            idx++
            setTimeout(Typing, 300)
        }
    }
    
    useEffect(() => {
        if(state === "#avtor" && typing === false){
            setIdx(0)
            disc.innerHTML = null
            Typing()
        }
    },[state, typing])
    
    return(
        <section id="avtor">
            <div className="container_fluid">
                <h2 className="avtor_title">Avtor</h2>
                <div className="public_avtor">
                    <div className="public_avtor_image">
                        <img src={AvtorImage} alt="" />
                        <div className="public_avtor_image_intro">
                            <h3>Shohijahon Musinkulov</h3>
                            <h5>ShokhDeveloper</h5>
                        </div>
                    </div>
                    <div className="public_avtor_texts">
                        <h2>Avtor in Movies</h2>
                        <p ref={textRef} className="public_avtor_disc">
                        Hello, My name <span style={{color: "goldenrod"}}>ShokhDeveloper</span>  and I am a Front-end Developer and I studied at Najot ta'lim. My knowledge is HTML + CSS, SASS, Bootstrap, Javascript (Ecmascript 6), Git Github, React, Redux ! I am the second child in the family and I keep my age a secret. I mainly work in Javascript programming language and am currently continuing to learn Typescript programming language. I live in Samarkand region of Uzbekistan and continue my career at Empire IT Academy. And in the future, I will still be the strongest programmer !
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}