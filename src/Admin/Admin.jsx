import "./Admin.css";
import { useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import { Context } from "../Settings";
import axios from "axios";
import { Statistika } from "./Statistika";
import { Route, Routes } from "react-router";
import { Foydalan } from "./Foydalanuvchilar";
import { Fikrlar } from "./Fikrlar";
import { Umumiy } from "./Umumiy";

export const Admin = () => {
  const { user } = useContext(Context);
  const getAdmin = useCallback(async () => {
    const request = await axios.get(`http://localhost:7777/admin`);
    const response = await request.data;
    return response;
  }, [user.id]);
  const { isLoading, isError, isSuccess, data } = useQuery("/admin", getAdmin);
  const handleChange = async (event) => {
    let idx = data?.findIndex(item => item.id === event.target.dataset.id-0)
    data[idx].permission = event.target.checked
    const request = await axios.put(`http://localhost:7777/admin/${event.target.dataset.id-0}`, data[idx])
    const response = await request.data
    return response
  }
  
  return (
    <>
      {isLoading && <h1>Yuklanmoqda</h1>}
      {isError && <h1 className="error">Server da xatolik yuz berdi</h1>}
      {isSuccess && (
        <>
          <div className="admin">
            <div className="container_fluid">
              <h1 className="admin__title">Admin paneli</h1>
              <table>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>Kino (JANR)</th>
                    <th>Ruxsat</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td>{item.title}</td>
                      <td>
                        <input
                          data-id={item.id}
                          onChange={handleChange}
                          type="checkbox"
                          defaultChecked={item.permission}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="#statistika">Statistika</a>
            </div>
          </div>
        </>
      )}
      <Statistika>
      <Routes>
        <Route index element={<Foydalan/>}/>
        <Route path="/foydalanuvchilar" element={<Foydalan/>}/>
        <Route path="/fikrlar" element={<Fikrlar/>}/>
        <Route path="/umumiy" element={<Umumiy/>}/>
      </Routes>
      </Statistika>
    </>
  );
};
