import { useRoutes } from "react-router"
import { HomePage, NowPlaying, Popular, Upcoming, TopRated } from "../Pages"
export const RoutesX = () => {
    let route = [
        {
            path: "/",
            element: <HomePage/>
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
    return useRoutes(route)
}