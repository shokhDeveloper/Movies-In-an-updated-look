import "./Credit.css";
import { useCallback, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { BASE_IMAGE, Btn, Context, getApi, getItem } from "../../Settings"
import {ArrowDownOutlined} from "@ant-design/icons"
import { CreditMovies } from "./CreditMovies";

export const Credit = () => {
    const {id} = useParams()
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const {moviesShow, setMoviesShow} = useContext(Context)
    const {pathname} = useLocation()
    const handleKey = (event) => {
        if(event.keyCode === 27){
            navigate(-1)
        }
    }
    const getCredit = useCallback(async () => {
        const request = await getApi.getCredit(id)
        const response = await request.data
        setData([response])
    },[id])
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => window.removeEventListener("keyup", handleKey)
    }, [])
    useEffect(() => {
        getCredit()
    },[getCredit])
    useEffect(() => {
        if(pathname.substring(0, 7) === "/credit" ){
            setTimeout(() => {
                setMoviesShow("block")
            },2000)
        }
    },[pathname])
    return(
        <>
        <div className="credit_page">
            <div className="container_fluid">
                {data?.map(item => {
                    console.log(item)
                  return(
                        <div className="credit__items">
                    <img src={BASE_IMAGE +  item?.person?.profile_path} alt="" />
                    <div className="credit__texts">
                        <h2 className="gold">{item.person.name}</h2>
                        <h4 className="white">{item?.media?.overview}</h4>
                        <div className="credit_text__settings">
                            <p className="white">Type = <span className="gold">{item?.job}</span></p>
                            <p className="white">Film = <span className="gold">{item?.media?.original_title.split(" ").length > 3? `${item?.media?.original_title?.split(" ").slice(0, 3).join(" ")} ... `  : item?.media?.original_title}</span></p>
                            <p className="credit_roli white">Roll = <span className="gold">{item?.media?.character}</span></p>
                        </div>  
                    </div>                  
                </div>
                    )
                }) }
            </div>
            <Btn onClick={() => {
                window.localStorage.removeItem("show_movies")
                setMoviesShow("none")
            }}  style={{display: moviesShow === "block" ? "block": "none"}} className="actor_show_btn" variant="gold">Shu aktyor ro'l oynagan kinolar <ArrowDownOutlined/> </Btn>
        </div>
         <CreditMovies id={id}/>       
    </>
    )
}