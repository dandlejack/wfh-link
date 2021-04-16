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
      divHeaderMain.classList.add('pt-8')
      setToggleMenu(true)
    } else {
      navTopMenu.classList.remove('pb-1')
      divHeader.classList.remove('show-menu')
      divHeaderMain.classList.remove('relative')
      divHeaderMain.classList.remove('pt-8')
      setToggleMenu(false)
    }
  }
  return <>
    <nav className='bg-blue-700 pb-9' id='nav-top-menu'>
      <div className="inline-block w-full mt-3">
        <div className="blockSet hidden sm:block container relative sm my-0 mx-auto">
          <Link href='/'>
            <a id='logo'>
              หาคนโพส.com
            </a>

            {/* <span className="text-white px-3 py-2 rounded-md hover:text-white text-lg font-medium cursor-pointer">WFH JOBS</span> */}
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
                <Link href='/posts/newpost'>
                  <div className='freepost mr-2 header-menu-items' style={{ border: 'solid 1px #FCED83', borderRadius: 5 }}>
                    <a className="text-white hover:text-black px-3 py-2 rounded-md text-lg font-medium" href='/newpost'>ลงประกาศฟรี</a>
                  </div>
                </Link>
                <span className='text-white px-3 py-2 rounded-md text-lg font-medium'>{user}</span>
                <ul className='dropdown-menu' >
                  <li className='sp text-base' >จัดการประกาศ</li>
                  {/* <Link href="/posts/myposts"><li className='hover:bg-gray-200'><span>Referral</span></li></Link> */}
                  <Link href="/posts/myposts"><li className='hover:bg-gray-200'><span>ประกาศของฉัน</span></li></Link>
                  <Link href="/posts/newpost"><li className='hover:bg-gray-200'><span>ลงประกาศ</span></li></Link>
                  {userRole === '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do=' ? <>
                    <Link href="/posts/admin-manage"><li className='hover:bg-gray-200'><span>จัดการประกาศ Admin</span></li></Link>
                    <Link href="/posts/admin-dashboard"><li className='hover:bg-gray-200'><span>รายงานจำนวนเข้าชมเว็บทั้งหมด</span></li></Link>
                  </>
                    : <></>}
                  <li className='sp text-base'>ข้อมูลสมาชิก</li>
                  {/* <li className='hover:bg-gray-200'><span>ข้อมูลส่วนตัว</span></li> */}
                  <li className='hover:bg-gray-200' onClick={handleLogout}><span >ออกจากระบบ</span></li>
                </ul>
                <a className="bar-a" onClick={showMenu}>
                  <FontAwesomeIcon className='bar-icon' icon={faBars} />
                </a>
              </div>
            ) : (
              <>
                <div className='right-0 top-0 header-menu lg:absolute' id='div-header-main'>
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
                    {userRole === '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do=' ?
                      <Link href="/posts/admin-manage">
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
  </>
}