import { Toaster } from "react-hot-toast";
import { useSesion } from "../contexts/SesionContext"
import Board from "./Board";
import Settings from "./Settings";
import GameOverModal from "./GameOverModal";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function Game(){
    
    const {sesion, gameWon} =  useSesion();
    const {widht,height} =  useWindowSize();

    return(
        <div className="flex game">
            {gameWon && <Confetti className="confetti" width={widht} height={height} />}
            <GameOverModal/>
            {sesion? (
                <Board/>
            ):(
                <Settings/>
            )}

            <Toaster position="top-center" toastOptions={{className: "toast"}} reverseOrder={false} />
        </div>
        
    )
}