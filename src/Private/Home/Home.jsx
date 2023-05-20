import { useContext } from "react"
import { Context } from "../../Settings"
import { Admin } from "../../Admin"

export const Home = () => {
    const {user} = useContext(Context)
    return(
        <>
            {user.name === "Admin" && user.email === "userAdmin@gmail.com" ? (
                <Admin/>
            ):(
                <h1>User</h1>
            )}
        </>
    )
}