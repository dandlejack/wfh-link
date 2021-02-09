import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
  const [user, setUser] = useState('')
  const [userRole, setUserRole] = useState('')
  const [toggleMenu, setToggleMenu] = useState(false)
  const [displayWidth, setDisplayWidth] = useState(1024)
  useEffect(() => {
    const getCookieData = Cookie.get('hrme')
    const getCookieToken = Cookie.get('token')

    if (getCookieData) {
      const userData = JSON.parse(getCookieData)
      setUser(userData.name)
    }
    if (getCookieToken !== undefined) {
      const jwtData = jwt_decode(getCookieToken)
      setUserRole(jwtData.role)
    }
    setDisplayWidth(window.screen.width)
  }, [])

  const handleLogout = () => {
    Cookie.remove('hrme')
    Cookie.remove('token')
    window.location.replace('/')
  }
  const showMenu = () => {
    const divHeader = document.getElementById('div-header')
    const divHeaderMain = document.getElementById('div-header-main')
    const navTopMenu = document.getElementById('nav-top-menu')
    if (!toggleMenu) {
      navTopMenu.classList.add('pb-1')
      divHeader.classList.add('show-menu')
      divHeaderMain.classList.add('relative')
      setToggleMenu(true)
    } else {
      navTopMenu.classList.remove('pb-1')
      divHeader.classList.remove('show-menu')
      divHeaderMain.classList.remove('relative')
      setToggleMenu(false)
    }
  }
  return <>
    <nav className='bg-blue-700 pb-3.5' id='nav-top-menu'>
      <div className="inline-block w-full mt-3">
        <div className="blockSet hidden sm:block container relative sm my-0 mx-auto">
          <Link href='/'>
            {/* <img className="px-3 py-4 cursor-pointer logo"/> */}
            <span className="text-white px-3 py-2 rounded-md hover:text-white text-lg font-medium cursor-pointer">WFH JOBS</span>
          </Link>
          {
            user === '' ? (
              <>
                <div className='right-0 top-0 header-menu lg:absolute ' id='div-header-main'>
                  <div className='div-header-items' id='div-header'>
                    <Link href='/posts/newpost'>
                      <div className='freepost mr-2 header-menu-items' style={{ border: 'solid 1px #FCED83', borderRadius: 5 }}>
                        <a className="text-white hover:text-black px-3 py-2 rounded-md text-lg font-medium" href='/newpost'>ลงประกาศฟรี</a>
                      </div>
                    </Link>
                    <Link href='/login'>
                      <div className='rounded header-menu-items'>
                        <a className=" text-white hover:underline hover:text-white px-3 py-2 rounded-md text-lg font-medium" href='login'>เข้าสู่ระบบ</a>
                      </div>
                    </Link>
                    <div className='hidden lg:inline'>
                      <span className='text-white' style={{ fontSize: 18 }}>|</span>
                    </div>
                    <Link href='/register'>
                      <div className='rounded header-menu-items' >
                        <a className=" text-white hover:underline hover:text-white px-3 py-2 rounded-md text-lg font-medium" href='/register'>สมัครสมาชิก</a>
                      </div>
                    </Link>
                  </div>
                </div>
                <a className="bar-a" onClick={showMenu}>
                  <FontAwesomeIcon className='bar-icon' icon={faBars} />
                </a>
              </>
            ) : user !== '' && displayWidth >= 1024 ? (
              <div className='show-dropdown-menu absolute top-0 right-0' >
                <span className='text-white px-3 py-2 rounded-md text-lg font-medium'>{user}</span>
                <ul className='dropdown-menu' >
                  <li className='sp text-base' >จัดการประกาศ</li>
                  <Link href="/posts/myposts"><li className='hover:bg-gray-200'><span>ประกาศของฉัน</span></li></Link>
                  <Link href="/posts/newpost"><li className='hover:bg-gray-200'><span>ลงประกาศ</span></li></Link>
                  {userRole === 'admin' ? <Link href="/posts/admin"><li className='hover:bg-gray-200'><span>จัดการประกาศ Admin</span></li></Link> : <></>}
                  <li className='sp text-base'>ข้อมูลสมาชิก</li>
                  {/* <li className='hover:bg-gray-200'><span>ข้อมูลส่วนตัว</span></li> */}
                  <li className='hover:bg-gray-200'><span onClick={handleLogout}>ออกจากระบบ</span></li>
                </ul>
                <a className="bar-a" onClick={showMenu}>
                  <FontAwesomeIcon className='bar-icon' icon={faBars} />
                </a>
              </div>
            ) : (
                  <>
                    <div className='right-0 top-0 header-menu lg:absolute ' id='div-header-main'>
                      <div className='div-header-items' id='div-header'>
                        <Link href='/posts/newpost'>
                          <div className='freepost mr-2 header-menu-items'>
                            <a className="text-white hover:text-black px-3 py-2 rounded-md text-lg font-medium" href='/newpost'>ลงประกาศฟรี</a>
                          </div>
                        </Link>
                        <Link href='/posts/myposts'>
                          <div className='rounded header-menu-items'>
                            <a className=" text-white hover:underline hover:text-white px-3 py-2 rounded-md text-lg font-medium" href='myposts'>ประกาศของฉัน</a>
                          </div>
                        </Link>
                        {userRole === 'admin' ?
                          <Link href="/posts/admin">
                            <div className='rounded header-menu-items'>
                              <a className=" text-white hover:underline hover:text-white px-3 py-2 rounded-md text-lg font-medium" href='admin'>จัดการประกาศ Admin</a>
                            </div>
                          </Link> : <></>}
                        <div className='hidden lg:inline'>
                          <span className='text-white' style={{ fontSize: 18 }}>|</span>
                        </div>
                        <div className='rounded header-menu-items' onClick={handleLogout}>
                          <a className=" text-white hover:underline hover:text-white px-3 py-2 rounded-md text-lg font-medium" href='/register'>ออกจากระบบ</a>
                        </div>
                      </div>
                    </div>
                    <a className="bar-a" onClick={showMenu}>
                      {!toggleMenu ? <FontAwesomeIcon className='bar-icon' icon={faBars} /> : <FontAwesomeIcon className='bar-icon' icon={faTimes} />}
                    </a>
                  </>
                )
          }
        </div>
      </div>
    </nav>
    {/* <nav className='bg-green-700'>
      <div className="inline-block w-full">
        <div className="hidden sm:block container sm my-0 mx-auto">
          <Link href='/'><a  className="float-left text-white hover:bg-green-600 hover:text-white px-3 py-2 mt-1 rounded-md text-lg font-medium">หน้าแรก</a></Link>
          <Link href='/posts/newpost'><a className="float-right text-white hover:bg-green-600 hover:text-white px-3 py-2 mt-1 rounded-md text-lg font-medium">ลงประกาศฟรี</a></Link>
        
          </div>
      </div>
    </nav> */}
    {/*backup*/}
    {/* <nav className='bg-green-700'>
      <div className="inline-block w-full">
        <div className="hidden sm:block container sm my-0 mx-auto">
          <Link href='/'><a  className="float-left text-white hover:bg-green-600 hover:text-white px-3 py-2 mt-1 rounded-md text-lg font-medium">หน้าแรก</a></Link>
         <Link href='/'><a className="float-left text-white px-3 py-2 rounded-md text-lg font-medium">ค้นหา</a></Link>
          <Link href='/'><a className="float-left text-white px-3 py-2 rounded-md text-lg font-medium">ลงโฆษณา</a></Link>
          <Link href='/'><a className="float-left text-white px-3 py-2 rounded-md text-lg font-medium">ติดต่อเว็บไซต์</a></Link> 
          <Link href='/posts/newpost'><a className="float-right text-white hover:bg-green-600 hover:text-white px-3 py-2 mt-1 rounded-md text-lg font-medium">ลงประกาศฟรี</a></Link>
          </div>
      </div>
    </nav>*/}
  </>
}