import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../Settings";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../Settings/assets/images/logo.png";
import LogoMini from "../../Settings/assets/images/favicon.png";
import { useEffect } from "react";
export const Sidebar = () => {
  const { sidebar, setSidebar } = useContext(Context);
  const [mini, setMini] = useState(false);
  const [state, setState] = useState("")
  const location = useLocation()

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
  return (
    <div
      style={{ transition: "0.5s ease all" }}
      className={
        sidebar === true ? "private_active_sidebar" : "private_sidebar"
      }
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
                {sidebar ? (
                    "Saqlanganlar"
                ): ""}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
