import React from 'react'
import { links } from './data'
import { useState } from 'react'
import Navlinks from './Navlinks'

const NavBar = () => {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navheader'>
          <img src='https://www.logodesign.net/images/nature-logo.png' />
        </div>
        <div className={!show ? 'navlinks' : 'navlinks showlinks'}>
          <ul>
            {links.map((link) => {
              const { id, name, url } = link
              return (
                <li key={id}>
                  <a href={url}>{name}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar
