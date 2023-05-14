import { useEffect, useRef, useState } from "react";
import "./Modal.css";
export const Modal = ({ children, title, modal, setModal, disc, donatMan }) => {
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
  return (
    <div style={{display: modal ? "flex" : "none",
    }} className="overlay_modal">
      <div className="modal">
        <div className="modal_header">
          <h3>{title}</h3>
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
          {children}
        </div>
      </div>
    </div>
  );
};
