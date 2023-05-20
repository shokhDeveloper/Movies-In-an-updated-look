import styled,{createGlobalStyle} from "styled-components";
export const GlocalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins-Regular";
        scroll-behavior: smooth;
    }
    .container_fluid{
        width: 95%;
        margin: 0 auto;
        padding: 0 10px;
    }
    .error_text{
        color: crimson;
    }
    .error_label{
        border: 2px solid crimson;
    }
`
export const  Image = styled.image.attrs((params)=> console.log(params) )``
const btn_object = {
    gold:{
        background: "goldenrod",
        color: "#fff"
    },
    black: {
        background: "black",
        color: "goldenrod",
    },
    google:{
        padding: "0.5rem 1rem",
        fontSize: "18px",
        margin: "0.5rem 0rem" ,
        background:" #fff",
        borderRadius: "5px"
    }
}
export const Btn = styled.button`
    padding: 0.5rem 1rem;
    background: ${({variant}) => btn_object[variant].background };
    color: ${({variant}) => btn_object[variant].color };
    border-radius: 8px;
    font-size: 18px;
    border: 1px solid transparent;
    outline: 1px solid transparent;
    display: block;
    margin: ${({className}) => className === "google" ? "1rem 0rem 0rem 0rem ": "0rem" };
`
export const SubmitterBtn = styled.button.attrs({
    type:"submit"
})`
    padding: 0.5rem 1rem;
    background: ${({variant}) => btn_object[variant].background };
    color: ${({variant}) => btn_object[variant].color };
    border-radius: 8px;
    font-size: 18px;
    border: 1px solid transparent;
    outline: 1px solid transparent;
    margin: ${({className}) => className === "submit" ? "1rem": "0rem"}
`
const Input_object = {
    error:{
        outline: "2px solid crimson"
    },
    default:{
        outline: "2px solid transparent"
    }
}
export const Input = styled.input`
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    outline: ${({variant}) => Input_object[variant].outline };
    background: #fff;
    width:   100%;
    display: block;
    font-size: 20px;
`
export const LabelTextObject = {
    error:{
        color: "crimson"
    },
    default:{
        color: "goldenrod"
    }
}
export const LabelText = styled.small`
    font-size: 14px;
    color: ${({variant}) => LabelTextObject[variant].color};
`
