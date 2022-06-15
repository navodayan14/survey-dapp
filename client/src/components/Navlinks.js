import React from 'react'
import { links } from './data'
import { useState } from 'react'

const Navlinks = ({ divClass }) => {
  return (
    <div className={divClass}>
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
  )
}

export default Navlinks
