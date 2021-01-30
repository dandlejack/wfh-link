import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';

export const Footer = () => {
  const [user, setUser] = useState('')
  const [userRole, setUserRole] = useState('')

  const handleLogout = () => {
    Cookie.remove('hrme')
    Cookie.remove('token')
    window.location.replace('/')
  }

  return <>
    <nav className='bg-green-800 h-14 w-full fixed bottom-0 z-50' id="footer-nav">
      <div className="inline-block w-full h-full mt-auto">
        <div className="blockSet hidden h-full sm:block container relative sm p-6 mx-auto text-center">
          <span className='text-white'>Copyright 2020-2021 WFHJOBS.</span>     
        </div>
      </div>
    </nav>   
  </>
}