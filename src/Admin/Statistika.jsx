import { NavLink } from "react-router-dom"
export const Statistika = ({children}) => {
    return(
        <div className="admin_statistika" id="statistika">
        <div className="container_fluid">
          <div className="admin_links">
                <NavLink to={"/foydalanuvchilar"} className={({isActive}) => isActive? "admin_active_link": "admin_link" }>Foydalanuvchilar soni </NavLink>
                <NavLink to={"/fikrlar"} className={({isActive}) => isActive? "admin_active_link": "admin_link" }>Fikrlar</NavLink>
                <NavLink to={"/umumiy"} className={({isActive}) => isActive? "admin_active_link": "admin_link" }>Umumiy</NavLink>
          </div>
        {children}
        </div>
      </div>
    )
} 