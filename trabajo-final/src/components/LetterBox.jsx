import { useEffect, useState } from "react"
import { useBoard } from "../contexts/BoardContext"
import { useSesion } from "../contexts/SesionContext";

export default function LetterBox({keyLetter, keyRow, isActiveRow}){

    const {renderWord} = useBoard();
    const {solutions} = useSesion(); 

    return (        
        <div className= {`flex letter-box ${solutions[keyRow]? solutions[keyRow][keyLetter].solution : ""}`} >
            {isActiveRow? 
                (renderWord[keyLetter]) : 
                (solutions[keyRow]? solutions[keyRow][keyLetter].letter : '') }
        </div>    
    )
}