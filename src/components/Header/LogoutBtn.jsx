import React from 'react'
import { authService } from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
function LogoutBtn() {
    const dispatch=useDispatch()
  return (
    <button
        className='logoutBtn'
        onClick={()=>{
            authService.logout()
            .then((res)=>{
                dispatch(logout())
            })
        }}
    >
        Log out
    </button>
  )
}

export default LogoutBtn