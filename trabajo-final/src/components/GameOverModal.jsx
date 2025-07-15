import { useEffect } from "react";
import { useSesion } from "../contexts/SesionContext"
import { useBoard } from "../contexts/BoardContext";

export default function GameOverModal(){
const {gameOver, gameWon, setSesion, setSolutions,setGameOver,setGameWon, solutions} = useSesion();
const {setActiveRow} = useBoard();

    const startNewGame = () => {
        setActiveRow(0);
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
                    {gameWon && (<div className="attempts">{`Total attempts: ${solutions.length}`}</div>)}
                    <button onClick={startNewGame} >NEW GAME</button>
                </div>
            )}
            
        </>
        
    )
}