import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from "../../Settings/assets/images/logo.png"
import { useCallback } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { useContext } from "react"
import { Context, Input } from "../../Settings"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useEffect } from "react"
export const Header = ({children}) => {
    const {user, sidebar, setSidebar} = useContext(Context)
    const [state, setState]  = useState("/")
    const {pathname}  = useLocation()
    const getAdmin = useCallback( async () => {
        const request = await axios.get(`http://localhost:7777/admin`)
        const response = await request.data
        return response
    }, [user.id])
    const {isLoading, isError, isSuccess, data} = useQuery("/admin", getAdmin)
    useEffect(() => {
        if(pathname !== "/top_rated" && pathname !== "/upcoming" && pathname !== "/popular" && pathname !== "/now_playing"){
            setState("/")
        }
    },[pathname])
    return(
        <>
        <header className="private_header">
            <nav className="private_nav">
                <div className="container_fluid">
                    <div className="private_header_items">
                    <button className="sidebar_btn" onClick={() => setSidebar(!sidebar) }>{sidebar ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/>}</button>
                    <ul className="nav_ul">
                        <li className={state === "/" ? "nav_active_list": "nav_list"}>
                            <NavLink onClick={() => setState("/")} className={({isActive}) => isActive ? "active_page": "page"} to={"/"}>Home</NavLink>
                        </li>
                        {isLoading && 
                            <li>Yuklanmoqda</li>
                        }
                        {isSuccess && 
                            <>
                                {(function(data){
                                    return (
                                        
                                        data?.map(item => {
                                            if(item.name === "rated"){
                                                if(item.permission !== false){
                                                    return(
                                                        <li className={state === "/top_rated" ? "nav_active_list": "nav_list"}>
                                                            <NavLink onClick={() => setState("/top_rated")}  className={({isActive}) => isActive ? "active_page": "page"} to={"/top_rated"}>Rating</NavLink>
                                                        </li>
                                                    )
                                                }
                                            }else if(item.name === "upcoming"){
                                                if(item.permission !== false){
                                                    return(
                                                        <li className={state === "/upcoming" ? "nav_active_list": "nav_list"}>
                                                            <NavLink onClick={() => setState("/upcoming")} className={({isActive}) => isActive ? "active_page": "page"} to={"/upcoming"}>Upcoming</NavLink>
                                                        </li>
                                                    )
                                                }
                                            }else if(item.name === "now-playing"){
                                                if(item.permission !== false){
                                                    return(
                                                        <li className={state === "/now_playing" ? "nav_active_list": "nav_list"}>
                                                            <NavLink onClick={() => setState("/now_playing")} className={({isActive}) => isActive ? "active_page": "page"} to={"/now_playing"}>Now playing</NavLink>
                                                        </li>
                                                    )
                                                }
                                            }else if(item.name === "popular"){
                                                if(item.permission !== false){
                                                    return(
                                                        <li className={state === "/popular" ? "nav_active_list": "nav_list"}>
                                                            <NavLink onClick={() => setState("/popular")} className={({isActive}) => isActive ? "active_page": "page"} to={"/popular"}>Popular</NavLink>
                                                        </li>
                                                    )
                                                }
                                            }
                                        }
                                       ))
                                }(data))}
                            </>
                        }
                        {isError && (
                            <li>
                                <h2 className="error">Xatolik yuz berdi</h2>
                            </li>
                        )}
                      </ul>
                      
                      <div className="private_search">
                        <Input placeholder="Search movie ..." variant={"default"} className="search"/>
                      </div>
                    </div>
                </div>
            </nav>
        </header>
        
        </>
    )
}