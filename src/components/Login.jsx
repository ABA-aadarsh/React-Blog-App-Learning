import React from 'react'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/authSlice'
import { authService } from '../appwrite/auth'
import { useState } from 'react'

function Login() {
    const {register,handleSubmit}=useForm()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const loginUserFunc=async (data)=>{
      console.log(data)
      const res=await authService.login(data)
      if(res){
        const userData=await authService.getCurrentUser()
        if(userData){
          dispatch(storeLogin({userData}))
          navigate("/")
        }
      }else{
        console.log("Login failed")
      }
    }
  return (
    <>
      <div className="loginForm">
        <h2>Login</h2>
        <p>
          Don't have account ?
          <Link
          to={"/signup"}
          >
            Sign up
          </Link>
        </p>
          <form 
            onSubmit={handleSubmit(loginUserFunc)}
          >
            <Input label="Email" type="email" {...register("email",{required:true})}/>
            <Input label="Password" type="password" {...register("password",{required:true})}/>
            <button type="submit">Login</button>
          </form>
      </div>
    </>
  )
}

export default Login