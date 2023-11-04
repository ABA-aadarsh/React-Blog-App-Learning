import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { authService } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'

function Signup() {
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch()

    const signUpFunction=async (data)=>{
        try {
            const res = await authService.createAccount(data)
            if (res) {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin({userData}));
                    navigate("/")
                } 
            }else{
                console.log("Sign up failed")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <>
        <div className="signupContainer">
            <h2>Sign up</h2>
            <p>Already have an account? 
                <Link
                    to={"/login"}
                >
                    Login
                </Link>
            </p>
            <form 
                onSubmit={handleSubmit(signUpFunction)}
            >
                <Input 
                    label="Name"
                    type="text"
                    {...register("name")}
                />
                <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                />
                <Input
                    label="Password"
                    type="password"
                    {...register("password")}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </>
  )
}

export default Signup