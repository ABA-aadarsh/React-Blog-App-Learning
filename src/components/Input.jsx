import React from 'react'
import { useId } from 'react'

function Input(
    {
        label,
        type="text",
        ...props
    },
    ref
) {
    const id=useId()
  return (
    <div className='inputContainer'>
        {label?
        (<label htmlFor={id}
        >{label}</label>):
        null
        }
        <input type={type} 
            ref={ref}
            {...props}
            id={id}
        />
    </div>
  )
}

export default React.forwardRef(Input)