import React from "react"
import { useContext } from "react"
import { Context } from "../../Settings"
import { Admin } from "../../Admin"
import { User } from "../User"
import { Audio } from "react-loader-spinner"
import { useState } from "react"
import { useEffect } from "react"

export const Home = () => {
    const {user} = useContext(Context)
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        }, 1500)    
    },[load])
    return(
        <>
            {user.name === "Admin" && user.email === "userAdmin@gmail.com" ? (
                <Admin/>
            ):(
                <React.Fragment>
                <div style={{display: load !== true ? "flex": "none" }} className="loader">
                    <Audio height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass/>
                </div>
                <User load={load}/>
                </React.Fragment>
            )}
        </>
    )
}