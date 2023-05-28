import { useEffect, useRef, useState } from "react";
import "./Modal.css";
export const Modal = ({ children, title, modal, setModal, disc, donatMan, error_text }) => {
  const [discription, setDiscription] = useState(disc);
  let [idx, setIdx] = useState(0);
  const discDonat = useRef();
  const Typing = () => {
      if (discription?.length > idx) {
        discDonat.current.innerHTML +=
          discription[idx] === "ShokhDeveloper"
            ? `<span style="color: goldenrod">ShokhDeveloper</span>`
            : ` ${discription[idx]}`;
          idx++;
        setTimeout(Typing, 300);
      }else{
        discDonat.current.innerHTML += ` ${donatMan} 😊`
        setTimeout(() => {
          setModal(false)
        }, 1500)
      }
    }
  useEffect(() => {
    if(modal === true && discription?.length ){
      console.log("UseEffect ishladi ")
      discDonat.current.innerHTML = null
        setIdx(0)
        Typing()
    }
  },[discription, modal, donatMan])
  let index = 0
  const TypingError = () => {
    let error = document.querySelector(".error_text")
    if(error_text){
      if(error_text.length > index){
        error.innerHTML += error_text.charAt(index)
        index++
        setTimeout(TypingError, 100)
      }
    }
  }
  useEffect(() => {
    if(error_text !== null && modal === true){
      let error = document.querySelector(".error_text")
        error.innerHTML = null
        TypingError()
    }
  },[error_text, modal])
  return (
    <div style={{display: modal ? "flex" : "none",
    }} className="overlay_modal">
      <div className="modal">
        <div style={{background: error_text ? "crimson": "gondenrod"}} className="modal_header">
          <h3 style={{color: error_text ? "#fff": "black"}}>{title}</h3>
          <button onClick={() => setModal(!modal)}>&times;</button>
        </div>
        <div className="modal_body">
          {disc ? (
            <p
              style={{ color: "#000" }}
              ref={discDonat}
              className="disc_donat"
            ></p>
          ) : null}
          {error_text? (
            <p className="error_text">
              
            </p>
          ): null}
          {children}
        </div>
      </div>
    </div>
  );
};
