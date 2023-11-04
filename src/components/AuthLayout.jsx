import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function AuthLayout({children}) {
    const authenticated=useSelector(state=>state.status)
    const navigate=useNavigate()

  return (
    <>
        {
            authenticated?(<>{children}</>):(
                <>
                    <h3>You are not logged in. Login First Please</h3>
                    <Link
                    to={"/login"}
                    >
                        Login
                    </Link>
                </>
            )
        }
    </>
  )
}

export default AuthLayout