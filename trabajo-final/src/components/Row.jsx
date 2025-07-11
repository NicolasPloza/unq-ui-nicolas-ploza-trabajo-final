import { useEffect, useRef, useState } from "react";
import { useSesion } from "../contexts/SesionContext"
import LetterBox from "./LetterBox";
import toast from "react-hot-toast";

export default function Row({keyRow, isActiveRow, activeRow, setActiveRow}) {
    
    const {sesion, attempts, setAttempts, checkWord} = useSesion();
    //const [activeLetterBox, setActiveLetterBox] = useState(0);
    //const [currentWord, setCurrentWord] = useState([]);

    const activeLetterBox = useRef(0);
    const currentWord = useRef([]);
    const [renderWord, setRenderWord] = useState([...currentWord.current]);
    
   const checkCurrentWord =  () => {
        checkWord([...currentWord.current])
            .then((res) => {
                const newAttempts = [...attempts];
                newAttempts[keyRow] = [...currentWord.current];
                setAttempts(newAttempts);
                setActiveRow(activeRow+1);

                currentWord.current = [];
                activeLetterBox.current = 0;
                setRenderWord([...currentWord.current]);
            })
            .catch((error) => {
                toast.error(error.message);
                currentWord.current = [];
                activeLetterBox.current = 0;
                setRenderWord([...currentWord.current]);
            });
   }
    
    useEffect(() => {
        if(!isActiveRow) return;

        const handleKeydown = (ev) => {
            if(activeLetterBox.current === sesion.wordLenght && ev.key === 'Enter'){
                checkCurrentWord();  
                return;
            }

            if(activeLetterBox.current > 0 && ev.key === 'Backspace'){       
                currentWord.current[activeLetterBox.current-1] = "";
                activeLetterBox.current--;

                setRenderWord([...currentWord.current]);

                return;
            }

            if(/^[a-zA-ZñÑ]$/.test(ev.key) && activeLetterBox.current < sesion.wordLenght){
                currentWord.current[activeLetterBox.current] = ev.key.toLowerCase();
                activeLetterBox.current++;

                setRenderWord([...currentWord.current]);
                
                return;
            }

            if(activeLetterBox.current < sesion.wordLenght && ev.key === 'Enter'){
                toast.error('Complete the word');
            }
        }
        
        const cleanUp = () => {
            document.removeEventListener('keydown', handleKeydown);
        }

        document.addEventListener('keydown', handleKeydown);
        return cleanUp;
    },[isActiveRow,attempts,keyRow,activeRow,checkWord])
    
    
    return (
        <div className={`flex row ${isActiveRow?"active": ""}`}>
            {isActiveRow?([...Array(sesion.wordLenght)].map((_,i) => 
                    <LetterBox key={i} isActive={i === activeLetterBox.current}>{currentWord.current[i]}</LetterBox>
            )):(
                [...Array(sesion.wordLenght)].map((_,i) => 
                    <LetterBox key={i}>{attempts[keyRow]? attempts[keyRow][i]:""}</LetterBox>
            ))}
        </div>
    )
}