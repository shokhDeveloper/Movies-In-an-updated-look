import axios from "axios"

export const BASE_URL = 'https://api.themoviedb.org/3/movie';
export const api_key = 'fac1e5db51e94e0a4f7245d1164a32e4';
export const BASE_IMAGE = "https://image.tmdb.org/t/p/w500/";
export const API_KEY_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWMxZTVkYjUxZTk0ZTBhNGY3MjQ1ZDExNjRhMzJlNCIsInN1YiI6IjYzYzZlMzNjNWFkNzZiMDA4NDJkYzAzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i_DpCgFH85QvkQ45l3WA66wTKns8etKpVk39wPOP_jw";
// 'https://api.themoviedb.org/3/search/movie?query=undisputed&page=1
console.log(BASE_URL.substring(0, 28))
export const getApi = {
    getPopular(page){
        return(
            axios.get(`${BASE_URL}/popular`, {
                params:{
                    api_key,
                    page
                }
            })
        )
    },
    getTopRated(page){
        return(
            axios.get(`${BASE_URL}/top_rated`, {
                params:{
                    api_key,
                    page
                }
            })
        )
    },
    getUpcoming(page){
        return(
            axios.get(`${BASE_URL}/upcoming`, {
                params:{
                    api_key,
                    page
                }
            })
        )
    },
    getNowPlaying(page){
        return(
            axios.get(`${BASE_URL}/now_playing`, {
                params:{
                    api_key,
                    page
                }
            })
        )
    },
    
    getCredits(id){
        return(
            axios.get(`${BASE_URL}/${id}/credits`, {
                params: {api_key},
            })
        )
    },
    getMovie(id){
        return(
            axios.get(`${BASE_URL}/${id}`,{
                params: {api_key},
                headers:{
                    Accept: "application/json",
                    Authorization: `Bearer ${API_KEY_TOKEN}` 
                }
            })
        )
    },
    getVideos(id){
        return(
            axios.get(`${BASE_URL}/${id}/videos`,{
                params: {api_key},
                headers:{
                    Accept: "application/json",
                    Authorization: `Bearer ${API_KEY_TOKEN}`
                }
            })
        )
    },
    getSearch(query, page){
        return(
            axios.get(`${BASE_URL.substring(0, 28)}/search/movie`, {
                params:{query, page},
                headers: {Accept: "application/json", Authorization: `Bearer ${API_KEY_TOKEN}`}
            })
        )
    }
}