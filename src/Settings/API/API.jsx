import axios from "axios"

export const BASE_URL = 'https://api.themoviedb.org/3/movie';
export const api_key = 'fac1e5db51e94e0a4f7245d1164a32e4';
export const BASE_IMAGE = "https://image.tmdb.org/t/p/w500/"
export const getApi = {
    getPopular(){
        return(
            axios.get(`${BASE_URL}/popular`, {
                params:{
                    api_key
                }
            })
        )
    }
}