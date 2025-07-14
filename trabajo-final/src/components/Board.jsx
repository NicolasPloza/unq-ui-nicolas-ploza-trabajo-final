import { useEffect, useState, useRef } from "react"
import { useSesion } from "../contexts/SesionContext";
import { ATTEMPTS_AMOUNT } from "../constants";
import Row from "./Row";
import GameOverModal from "./GameOverModal";
import toast from "react-hot-toast";
import KeyBoard from "./KeyBoard";

export default function Board(){
    const [activeRow, setActiveRow] = useState(0);
    const {gameOver, gameWon, toastId} = useSesion();

    useEffect(() => {
        toast('Guess the first word', {id: toastId.current, duration: 1000});
    
    },[])

    return (
        <div className="flex column">
            <div className={`flex column ${(gameWon || gameOver)? "overshadow": ""}`}>
                {[...Array(ATTEMPTS_AMOUNT)]
                    .map((_,i) => <Row key={i} keyRow={i} activeRow={activeRow} setActiveRow={setActiveRow} isActiveRow={i === activeRow}/>)}
            </div>
            <div className="key-board-container">
                <KeyBoard/>
            </div>
        </div>
        
        
    )
}