import "./Sidebar.css"
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../Settings";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../Settings/assets/images/logo.png";
import LogoMini from "../../Settings/assets/images/favicon.png";
import { useEffect } from "react";
import { useCart } from "react-use-cart";
export const Sidebar = () => {
  const { sidebar, setSidebar } = useContext(Context);
  const [mini, setMini] = useState(false);
  const [state, setState] = useState("")
  const [sidebarClass, setSidebarClass] = useState("private_sidebar")
  const location = useLocation()
  
  const cart = useCart()
  useEffect(() => {
    if (sidebar !== true) {
      setTimeout(() => {
        setMini(false);
      }, 100);
    } else {
      setMini(true);
    }
  }, [sidebar]);
  useEffect(() => {
        if(location.pathname !== "/settings" && location.pathname !== "/locals_movie" ){
            setState("")
        }
  },[location])
  useEffect(() => {
    if(sidebar){
      setTimeout(() => {
        setSidebarClass("private_active_sidebar")
      }, 300)  
    }else{
      setSidebarClass("private_sidebar")  
    }
  }, [sidebar])
  return (
    <div style={{display: sidebar === true ? "block": "none"}} className="sidebar_overlay">
    <div 
      style={{ transition: "0.5s ease all" }}
      className={sidebarClass}
    >
      <div className="container_fluid">
        <div className="private_sidebar_logo">
          <Link to={"/"}>
            {mini ? (
              <img src={Logo} alt="Logo" />
            ) : (
              <img src={LogoMini} className="LogoMini" alt="Logo" />
            )}
          </Link>
          <button onClick={() => {
            setSidebarClass("private_sidebar")
            setTimeout(() => {
              setSidebar(false)
            }, 300)
          }}>&times;</button>
        </div>
      </div>
      <div className="sidebar__items">
        <ul className="sidebar__links">
          <li className={state !== "/settings" ? "sidebar_list": "sidebar_active_list"}>
            <NavLink onClick={() => {
                setState("/settings")
                setSidebar(false)
            }} className={"sidebar_link"} to={"/settings"}>
              {sidebar ? (
                "Sozlamalar"
              ): ""}
            </NavLink>
          </li>
          <li className={state !== "/locals_movie" ? "sidebar_list": "sidebar_active_list" }>
            <NavLink class onClick={() => {
                setState("/locals_movie")
                setSidebar(false)
            }} className={"sidebar_link"} to={"/locals_movie"}>
                <span class="count_sidebar_like_movie">{cart?.totalItems}</span>
                {sidebar ? (
                    "Saqlanganlar"
                ): ""}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};
