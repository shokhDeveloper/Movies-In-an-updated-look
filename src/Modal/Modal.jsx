import { useEffect, useRef, useState } from "react";
import "./Modal.css"
export const Modal = ({children, title, modal, setModal, disc}) => {
    const [discription, setDiscription] = useState(disc.split(" "))
    let [idx, setIdx] = useState(0)
    const discDonat = useRef()
    const overlayModal = {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.4)",
        display: modal ? "flex": "none",
        alignItems: "center",
        justifyContent: "Center",
        zIndex: 20
    }
    const Typing = () => {
        if(discription?.length > idx ){
            discDonat.current.innerHTML += discription[idx] === "ShokhDeveloper" ? `<span style="color: goldenrod">ShokhDeveloper</span>`  : ` ${discription[idx]} `
            idx++
            setTimeout(Typing, 300)
        }
    }
    useEffect(() => {
        if(disc?.length){
            discDonat.current.innerHTML = null
            Typing()   
        }
    },[disc])
    return(
        <div style={overlayModal} className="overlay_modal">
            <div className="modal">
                <div className="modal_header">
                    <h3>{title}</h3>
                    <button onClick={() => setModal(!modal)}>&times;</button>
                </div>
                <div  className="modal_body">
                    {disc ? (
                        <p style={{color: "#000"}} ref={discDonat} className="disc_donat"></p>
                    ): null}
                </div>
            </div>
        </div>
    )
}