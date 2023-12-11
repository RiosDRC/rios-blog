"use client"

import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../img/logo.png'
import Toggle from '../img/menu.svg'
import Login from './Login'

export default function Navbar() {
    const { currentUser, login, logout, loginView, setLoginView } = useContext(AuthContext)
    const [isToggled, setIsToggled] = useState(false)

    const Tabs = () => (
      <>
        <Link href='/art' className='tabs_link'><li>ART</li></Link>
        <Link href='/science' className='tabs_link'><li>SCIENCE</li></Link>
        <Link href='/technology' className='tabs_link'><li>TECHNOLOGY</li></Link>
        <Link href='/cinema' className='tabs_link'><li>CINEMA</li></Link>
        <Link href='/design' className='tabs_link'><li>DESIGN</li></Link>
        <Link href='/food' className='tabs_link'><li>FOOD</li></Link>
        {currentUser ?
        <>
          <Link href='/user'
            className='tabs_link flex md:flex-row-reverse md:self-start items-center gap-1 cursor-pointer'>
             {currentUser.img && 
              <Image
                src={currentUser.img}
                alt=""
                blurDataURL={currentUser.img}
                placeholder='blur'
                width={30}
                height={30}
                quality={100}
                style={{width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%'}}
              />
            }
            <span>{currentUser.username}</span>
          </Link>
          <li onClick={logout} className='authButtons'>Logout</li>
        </>
          : <li
            className='authButtons'
            onClick={() => {setLoginView(true), setIsToggled(false)}}
          >Login</li>
        }
        <Link href='/posts/write' className='writeButton'>
          <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Write</p>
        </Link>
      </>
      )

  return (
    <nav className='navbar'>
      <Link href='/' className='hover:scale-110 duration-[0.3s]'>
        <Image
          src={Logo}
          alt='Logo'
          priority
          width={500}
          height={350}
          style={{width: 'auto', height: '60px'}}
          quality={100}
          placeholder='blur'
        />
      </Link>
      <ul id='tabs'>        
        <Tabs />
      </ul>

      <div className="toggleButton md:flex hidden">
        <Image
          src={Toggle}
          alt='menu_icon'
          width={40}
          style={{objectFit: "contain"}}
          quality={100}
          className='cursor-pointer'
          onClick={() => setIsToggled(prev => !prev)}
        />
        {isToggled && (
          <ul className="toggleMenu scale-in-ver-top" onClick={() => setIsToggled(false)}>
            <Tabs />
          </ul>
        )}
      </div>

      {loginView &&
        <Login />
      }
    </nav>
  )
}
