import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Header() {
    
    const loggedIn=useSelector(state=>state.status)

    const navItems=[
        {
            name:"Home",
            path:"/",
            active:true
        },
        {
            name:"Read Posts",
            path:"/posts",
            active:loggedIn
        },
        {
            name:"CreatePost",
            path:"/create-post",
            active:loggedIn
        },
        {
            name:"Signup",
            path:"/signup",
            active:!loggedIn
        },
        {
            name:"Login",
            path:"/login",
            active:!loggedIn
        }

    ]
  return (
    <>
        <nav>
            <div className="navContainer">
                <div className="logo">
                    <h4>Bloggo</h4>
                </div>
                <div className="navLinks">
                    <ul>
                        {
                            navItems.map(item=>
                                
                                item.active?
                                (
                                    <li
                                        key={item.name}
                                    >
                                        <Link
                                        to={item.path}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ):null
                            )
                        }
                    </ul>
                </div>
                {
                    loggedIn==true && <LogoutBtn />
                }
            </div>
        </nav>
    </>
  )
}

export default Header