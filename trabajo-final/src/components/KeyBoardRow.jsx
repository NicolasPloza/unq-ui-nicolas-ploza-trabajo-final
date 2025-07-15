import { useEffect, useState } from "react";
import { useBoard} from "../contexts/BoardContext";
import { useSesion } from "../contexts/SesionContext";

export default function KeyBoardRow({keys}){

    const {handleKeydown} = useBoard();
    const {solutions} = useSesion();

    const handleClick = (ev) => {
        const pressedKey = ev.target.textContent;
        handleKeydown({key: pressedKey});
        ev.target.blur();
    }

    return (
        <div className="key flex row">
            {keys.map( (char, i) =>
                char.letter === 'Enter' || char.letter === 'Backspace'? (
                    <button key={i} onClick={handleClick}  className={`flex letter-box enter`}>{char.letter}</button>
                ): (
                    <button key={i} onClick={handleClick} className={`flex letter-box ${char.style}` }>{char.letter}</button>         
            ))}
        </div>    
    )
}