import React from 'react'

const Header = ({title}) => {
  return (
    <header>
            <div className="header font">
                  <h2>{title}</h2  >
            </div>
    </header>
  )
}

export  {Header}