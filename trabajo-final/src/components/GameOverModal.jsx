import { useEffect } from "react";
import { useSesion } from "../contexts/SesionContext"
import Confetti from 'react-confetti';

export default function GameOverModal(){
const {gameOver, gameWon, attempts, setAttempts, setSesion, setSolutions,setGameOver,setGameWon} = useSesion();

    const startNewGame = () => {
        setAttempts([]);
        setSolutions([]);
        setGameOver(false);
        setGameWon(false);
        setSesion('');
    }


    useEffect(() => {
        const handleKeyDown = (ev) => {
            if(ev.key === 'Enter'){
                startNewGame();
            }

        }
        if(gameWon || gameOver){
            document.addEventListener('keydown', handleKeyDown);
        }

        const cleanUp = () => {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return cleanUp;
    },[gameOver,gameWon])

    return (
        <>
            {(gameOver || gameWon) && (
                <div className={`game-over-modal ${gameWon? "win": ""}`}>
                    <div className="topList">{gameWon? "You Win": "You Lost"}</div>
                    {gameWon && (<div className="attempts">{`Total attempts: ${attempts.length}`}</div>)}
                    <button onClick={startNewGame} >NEW GAME</button>
                </div>
            )}
            
        </>
        
    )
}