import { useEffect, useRef, useState } from "react";
import "./Modal.css";
export const Modal = ({ children, title, modal, setModal, disc, donatMan }) => {
  let string = disc.split(" ")
  string.push(donatMan)
  console.log(string)
  const [discription, setDiscription] = useState(string.join(" ").split(" "));
  let [idx, setIdx] = useState(0);
  const discDonat = useRef();
  const Typing = () => {
    if (discription?.length > idx && donatMan !== null) {
      discDonat.current.innerHTML +=
        discription[idx] === "ShokhDeveloper"
          ? `<span style="color: goldenrod">ShokhDeveloper</span>`
          : ` ${discription[idx]}    `;
        idx++;
      setTimeout(Typing, 300);
    }
  };
  useEffect(() => {
    if (discription?.length && modal === true) {
      discDonat.current.innerHTML = null;
      setIdx(0)
      Typing();
    }
  }, [discription, modal]);
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
        </div>
      </div>
    </div>
  );
};
