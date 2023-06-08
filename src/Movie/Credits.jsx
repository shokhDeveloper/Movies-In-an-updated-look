import { useEffect } from "react"
import Slider from "react-slick"
import { BASE_IMAGE, getApi } from "../Settings"
import "./credit-slick.css"
import "./credit-slick-theme.css"
import { useCallback } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
export const Credits = ({id, name}) => {
    const [data, setData ] = useState([])
    const handleGetCredits = useCallback(async () => {
        const request = await getApi.getCredits(id)
        const response = await request.data
        setData(response?.cast)
    },[id])
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    }
    useEffect(() => {
        handleGetCredits()
    },[handleGetCredits])
    return(
        <>
        <div className="credits">
        <div className="home_page_title">
            <h1>{name} Actors</h1>
        </div> 
        {data?.length ? (
            <Slider {...settings}>
                {data?.slice(0, 20)?.map((item) => (
                    <Link  to={`/credit/${item?.credit_id}`} className="credit" key={item.id}>
                        {(function(){
                            if(item?.profile_path !== null){
                                return(
                                    <img src={BASE_IMAGE + item?.profile_path} alt="" />
                                )
                            }else{
                                return(
                                    <img src={`https://via.placeholder.com/200x200`} alt="" />
                                )
                            }
                        }(item))}
                        <div className="credit_intro">
                            <h2>{item?.name}</h2>
                        </div>
                    </Link>
                ))}
            </Slider>
        ): (
            <h1 className="error">Topilmadi</h1>
        )}
        </div>
        </>
    )
}