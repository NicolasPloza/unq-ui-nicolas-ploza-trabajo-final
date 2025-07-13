import { Toaster } from "react-hot-toast";
import { useSesion } from "../contexts/SesionContext"
import Board from "./Board";
import Settings from "./Settings";
import GameOverModal from "./GameOverModal";

export default function Game(){
    
    const {sesion, setSesion} =  useSesion();

    return(
        <div className="flex game">
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