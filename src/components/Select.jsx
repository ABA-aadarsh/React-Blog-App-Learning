import React, {useId} from 'react'

const Select=React.forwardRef(
    (
        {
            options=[],
            label,
            ...props
        },ref
    )=>{
        const id=useId()
        return (
            <>
                {label && 
                (<label htmlFor={id}>{label}</label>)
                }
                <select id={id}
                    {...props}
                    style={{textTransform:"capitalize"}}
                    ref={ref}
                >
                    {options?.map(option=>(
                        <option value={option} key={option}
                            style={{textTransform:"capitalize"}}
                        >{option}</option>
                    ))}
                </select>
            </>
        )
    }
)

export default Select