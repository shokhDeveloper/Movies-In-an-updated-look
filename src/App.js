// import React, { useCallback, useEffect, useState } from "react";
// import {Action} from "./Settings/store/reducer"
// import {useSelector, useDispatch} from "react-redux"
// import YouTube from "react-youtube"
// import { useQuery } from "react-query";
// function App() {
//   const selector = useSelector((posts) => posts.Reducer)
//   const dispatch = useDispatch()
//   const getTrailer = () => {
//     fetch("https://api.themoviedb.org/3/movie/157336/videos?api_key=fac1e5db51e94e0a4f7245d1164a32e4")
//     .then((response) => response.json())
//     .then((data) => {
//       if(data?.results?.length){
//          let response = data?.results?.find(item => item)
//          dispatch(Action.setPosts([response]))
//       }
//     })    
//   }
//   const {isLoading, isError, isSuccess} = useQuery("/videos?api_key=fac1e5db51e94e0a4f7245d1164a32e4", getTrailer)
//   const getMovie = useCallback(() => {
//     return(
//       <YouTube videoId={selector.posts[0].key}/>
//     )
//   },[selector])
//   useEffect(() => {
//     if(selector?.length){
//       getMovie() 
//     }
//   },[getMovie])
//   return(
//     <div>
//       {isLoading ? (
//         <h1>Yuklanmoqda</h1>
//       ): isError? (
//         <h1>XATOLIK</h1>
//       ): isSuccess ? (
//         <>
//           {selector?.posts?.length ? getMovie(): null }
//         </>
//       ): null}
//     </div>
//   )
// }
// export default App;

import React, {  useContext, useEffect } from "react"
import { Context, GlocalStyle } from "./Settings"
import { Navigate, Route, Routes, useLocation } from "react-router"
import { Home, SignIn } from "./Public"
import {Home as PrivateHome} from "./Private"
import { SignUp } from "./Public/Sign-up"
import {ReactQueryDevtools} from "react-query/devtools"
export const App = () => {
  const {token, setMoviesShow} = useContext(Context)
  const {pathname} = useLocation()
  useEffect(() => {
    if(pathname.substring(0, 7) === "/credit"){
        // setMoviesShow("block")

    }else{
      setMoviesShow("none")
      window.localStorage.removeItem("show_movies")
    }
  },[pathname])  
  return(
    <React.Fragment>
      <Routes>
        {token  !== null? (
          <>
              <Route path="/*" element={<PrivateHome/>}/>
          </>
        ) : (
          <>
            <Route path="/*" element={<Home/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="*" element={<Navigate to={"/"} replace={true}/>}/>
          </>
          
        )}
      </Routes>
      <GlocalStyle/>
      <ReactQueryDevtools/>
    </React.Fragment>
  )
}