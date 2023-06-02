import { useRoutes } from "react-router"
import { HomePage, NowPlaying, Popular, Upcoming, TopRated, Search } from "../Pages"
import { useContext, useEffect } from "react"
import { Context } from "../../Settings"
import { Home } from "../Home/Home"
import { Movuie } from "../../Movie"
import { SettingsUser } from "../SettingsUser"
export const RoutesX = ({load}) => {
    const {homeLink} = useContext(Context)
    let route;
        if(homeLink !== "block"){
            route = [
                {
                    path: "/",
                    element: <TopRated/>
                },
                {
                   path: "/top_rated",
                   element: <TopRated/>
               },
               {
                   path: "/now_playing",
                   element: <NowPlaying/>
               },
               {
                   path: "/popular",
                   element: <Popular/>
               },
               {
                   path: "/upcoming",
                   element: <Upcoming/>
               }
           ]
        }else{
            route = [
                {
                    path: "/",
                    element: <HomePage load={load}/>
                },
                {
                   path: "/top_rated",
                   element: <TopRated/>
               },
               {
                   path: "/now_playing",
                   element: <NowPlaying/>
               },
               {
                   path: "/popular",
                   element: <Popular/>
               },
               {
                   path: "/upcoming",
                   element: <Upcoming/>
               },
               {
                   path: `/movie/:id`,
                   element: <Movuie/>
               },
               {
                    path: "/settings/*",
                    element: <SettingsUser/>
               },
               {
                    path: "/search_movie/:text",
                    element: <Search/> 
               }
           ]
        }
    return useRoutes(route)
}