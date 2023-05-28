import axios from "axios"
import { useEffect, useState } from "react"

export const useFetching = (url) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const request = await axios.get(url)
            const response = await request.data
            setData(response)
        }
        getData()
    },[url])
    return {data}
}