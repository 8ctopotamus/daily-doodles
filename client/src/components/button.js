import React from 'react'

const Button = ({ className, children, href = '#', onClick }) => {
  return <a 
    href={href} 
    className={`btn ${className}`} 
    onClick={onClick}
  >
    {children}
  </a>
}

export default Button