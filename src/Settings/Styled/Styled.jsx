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
`