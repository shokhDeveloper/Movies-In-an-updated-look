import { NavLink } from "react-router-dom";
import styled,{createGlobalStyle} from "styled-components";
export const GlocalStyle = createGlobalStyle`
    ::-webkit-scrollbar{
        display: none;
    }
    *{
        margin: 0;
        padding: 0; 
        box-sizing: border-box;
        font-family: "Poppins-Regular";
        scroll-behavior: smooth;
        user-select: none;
    }
    .container_fluid{
        width: 95%;
        margin: 0 auto;
    }
    .error_text{
        color: crimson;
    }
    .error_label{
        border: 2px solid crimson;
    }
    .eye{
        font-size: 22px;
        padding: 0.5rem;
    }
`
export const  Image = styled.image.attrs((params)=> console.log(params) )``
export const LinkMovie = styled(NavLink)`
    color: #fff;
    padding-bottom: 0.5rem;
    text-decoration: none;
    font-size: 20px;
`
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
    },
    crimson:{
        background: "crimson",
        color: "#fff"
    
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
    export const Input = styled.input`
        padding: ${(params) => params.className === "search" ? "0rem 0.5rem": "0.5rem 1rem"};
        border: 1px solid transparent;
        outline: ${({variant}) => Input_object[variant].outline };
        /* background: #fff; */
        width:   100%;
        display: block;
        font-size: ${({className}) => className === "search" ? "15px": "20px"};
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
export const PasswordInput = styled.label`
    background: #fff;
    width: 100%;
`
