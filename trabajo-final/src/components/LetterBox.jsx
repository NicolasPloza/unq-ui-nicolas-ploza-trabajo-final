import { useEffect, useState } from "react"

export default function LetterBox({isActive, children}){

    return (        
        <div className= {`flex letter-box ${isActive? "active" : ""}`} >{children}</div>    
    )
}