import { useSesion } from "../contexts/SesionContext";
import LetterBox from "./LetterBox";

export default function KeyBoardRow({keys}){

    
    
    return (
        <div className="key-row flex row">
            {keys.map( (char) => 
                char === 'Enter' || char === 'Backspace'? (
                    <button className={`flex letter-box enter`}>{char}</button>
                ): (
                    <button className="flex letter-box">{char}</button>)         
            )}
        </div>    
    )
}