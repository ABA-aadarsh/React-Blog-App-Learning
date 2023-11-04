import { useEffect, useState } from "react"
import {  Provider, useDispatch } from "react-redux"
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"
import { authService } from "./appwrite/auth"
import { login,logout } from "./store/authSlice"

function App() {
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  return (
    <>
      {
        !loading?
        (
          <>
            <Header/>
            <div className="mainContainer">
              <Outlet/>
            </div>
            <Footer/>
          </>
        ):(
          <>
          </>
        )
      }
      
    </>
  )
}

export default App
