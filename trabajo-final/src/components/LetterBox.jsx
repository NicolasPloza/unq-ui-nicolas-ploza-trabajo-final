import { useEffect, useState } from "react"

export default function LetterBox({solution, children}){

    return (        
        <div className= {`flex letter-box ${solution? solution.solution : ""}`} >{children}</div>    
    )
}