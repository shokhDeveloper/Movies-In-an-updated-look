import "./Settings.css"
import { Route, Routes } from "react-router"
import { NavLink } from "react-router-dom"
import { LinkMovie } from "../../Settings"
import { useState } from "react"
import { Posts } from "./Posts"
import { User } from "./User"

export const SettingsUser = () => {
    const [state, setState] = useState("") 
    return(
        <div className="settings_user">
            <div className="container_fluid">
                <div className="home_page_title">
                    <h1>Sozlamalar</h1>
                </div>
                <div className="settings_user_links">
                    <LinkMovie style={{borderBottom: state === "user" ? "1px solid goldenrod": "1px solid transparent"}} onClick={() => setState("user")} to={"user"}>Akkaunt sozlamalari</LinkMovie>    
                    <LinkMovie onClick={() => setState("posts")} to={"posts"} style={{borderBottom: state === "posts" ? "1px solid goldenrod": "1px solid transparent"}}>Postlar</LinkMovie>
                </div>
                <Routes>
                    <Route index element={<Posts/>}/>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/user" element={<User/>}/>
                </Routes>
            </div>
        </div>
    )
}