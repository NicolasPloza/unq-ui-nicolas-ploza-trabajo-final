import { Toaster } from "react-hot-toast";
import { useSesion } from "../contexts/SesionContext"
import Board from "./Board";
import Settings from "./Settings";

export default function Game(){
    
    const {sesion, setSesion} =  useSesion();

    return(
        <div className="game">
            {sesion? (
                <Board/>
            ):(
                <Settings/>
            )}

            <Toaster position="top-center" reverseOrder={false} />
        </div>
        
    )
}