import { useEffect, useState } from "react"
import { useSesion } from "../contexts/SesionContext";
import { ATTEMPTS_AMOUNT } from "../constants";
import Row from "./Row";
import GameOverModal from "./GameOverModal";

export default function Board(){
    const [activeRow, setActiveRow] = useState(0);
    const {gameOver, gameWon} = useSesion();


    return (
        <div className="flex">
            <div className={`flex column ${(gameWon || gameOver)? "overshadow": ""}`}>
                {[...Array(ATTEMPTS_AMOUNT)]
                    .map((_,i) => <Row key={i} keyRow={i} activeRow={activeRow} setActiveRow={setActiveRow} isActiveRow={i === activeRow}/>)}
            </div>
        </div>
        
        
    )
}