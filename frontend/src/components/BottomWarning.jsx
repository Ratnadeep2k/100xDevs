import { Link } from "react-router-dom";
import React from "react"
export function BottomWarning({label,buttonText,to}){
    return <div>
        <div>
            {label}
        </div>
        <Link className='pointer underline pl-1 cursor-pointer' to={to}>
            {buttonText}
        </Link>
    </div>
}