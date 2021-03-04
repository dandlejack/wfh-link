import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie'
import Link from 'next/link'
const DashboardMenu = ({ role }) => {
  const [userRole, setUserRole] = useState('')
  useEffect(() => {
    const getCookieData = Cookie.get('token')
    if (getCookieData !== undefined) {
      const jwtData = jwt_decode(getCookieData)
      setUserRole(jwtData.role)
    }
  }, [])
  return <>
    <div className='work-manage-menu w-full lg:w-60 sm:mb-1'>
      <div className="ads-manage">
        <div className='ads-manage-header p-2 bg-blue-600 text-white text-base' style={{ borderRadius: '5px 5px 0px 0px' }}>
          <span>จัดการประกาศ</span>
        </div>
        <Link href='/posts/myposts'>
          <div className='ads-manage-menu pl-4 py-2 bg-white border-b hover:bg-gray-200 cursor-pointer'>
            <span >ประกาศของฉัน</span>
          </div>
        </Link>
        <Link href='/posts/newpost'>
          <div className='ads-manage-menu pl-4 py-2 bg-white border-b hover:bg-gray-200 cursor-pointer'>
            <span >ลงประกาศใหม่</span>
          </div>
        </Link>

        {userRole === 'admin' ? <><Link href='/posts/admin-manage'>
          <div className='admin-menu  pl-4 py-2 bg-white border-b hover:bg-gray-200 cursor-pointer'>
            <div>
              <span style={{ color: '#000' }}>จัดการประกาศ Admin</span>
            </div>
          </div>
        </Link>
        <Link href='/posts/TopTenToday'>
          <div className='admin-menu  pl-4 py-2 bg-white border-b hover:bg-gray-200 cursor-pointer'>
            <div>
              <span style={{ color: '#000' }}>จัดการ 10 อันดับรายได้สูงสุดของวัน</span>
            </div>
          </div>
        </Link>
        </>
         : <></>}
      </div>
    </div></>
}

export default DashboardMenu
