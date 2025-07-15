import { useEffect, useRef, useState } from "react";
import { useSesion } from "../contexts/SesionContext"
import LetterBox from "./LetterBox";
import toast from "react-hot-toast";
import { ATTEMPTS_AMOUNT } from "../constants";
import { useBoard } from "../contexts/BoardContext";

export default function Row({keyRow, isActiveRow}) {
    
    const {handleKeydown, renderWord} = useBoard();
    const {sesion,solutions, gameWon ,gameOver} = useSesion();

    
    useEffect(() => {
        if(!isActiveRow ||gameWon || gameOver) return; 
        
        const cleanUp = () => {
            document.removeEventListener('keydown', handleKeydown);
        }

        document.addEventListener('keydown', handleKeydown);

        
        return cleanUp;
    },[renderWord,solutions])

    

    return (
        <div className={`flex row ${isActiveRow?"active": ""}`}>
            {[...Array(sesion.wordLenght)].map((_, i) => <LetterBox key={i} keyLetter = {i} keyRow={keyRow} isActiveRow={isActiveRow}/>)}
        </div>
    )
}