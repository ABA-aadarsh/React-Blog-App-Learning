import React from 'react'

function Button(
    {
        children,
        clickHandle=()=>{},
        ...props
    }
) {
  return (
    <button {...props}
    onClick={clickHandle}
    >
        {children}
    </button>
  )
}

export default Button