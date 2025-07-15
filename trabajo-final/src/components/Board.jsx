import { useEffect, useState, useRef } from "react"
import { useSesion } from "../contexts/SesionContext";
import { ATTEMPTS_AMOUNT } from "../constants";
import Row from "./Row";
import GameOverModal from "./GameOverModal";
import toast from "react-hot-toast";
import KeyBoard from "./KeyBoard";
import { useBoard } from "../contexts/BoardContext";

export default function Board(){
    const {row, activeRow} = useBoard();
    const {gameOver, gameWon, toastId, setGameOver} = useSesion();

    const handleClick = () => {
        setGameOver(true);
    }
    
    useEffect(() => {
        toast('Guess the first word', {id: toastId.current, duration: 1000});
    },[])

    return (
        <div className={`flex column ${(gameWon || gameOver)? "overshadow": ""}`}>
            <header><button onClick={handleClick}>Give up</button></header>
            <div>
                {[...Array(ATTEMPTS_AMOUNT)]
                    .map((_,i) => <Row key={i} keyRow = {i} isActiveRow={i === activeRow}/>)}
            </div>
            <div className="key-board-container">
                <KeyBoard/>
            </div>
        </div>        
    )
}