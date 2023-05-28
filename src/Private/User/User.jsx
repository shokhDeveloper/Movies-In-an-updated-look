import "./User.css"
import React from "react"
import { Header } from "../Header"
import { Sidebar } from "../Sidebar"
import { HomePage } from "../Pages"
import { RoutesX } from "../RoutesX/RoutesX"

export const User =  ({load}) => {
    return(
        <div className="user_page" style={{display: load !== false ? "flex": "none" }}>
            <Sidebar/>
            <main>  
                <Header/>
                <div className="routesX" >
                <RoutesX load={load}/>
                </div>
            </main>
        </div>
    )
}