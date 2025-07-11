import { useEffect, useRef, useState } from "react";
import { useSesion } from "../contexts/SesionContext"
import LetterBox from "./LetterBox";
import toast from "react-hot-toast";

export default function Row({keyRow, isActiveRow, activeRow, setActiveRow}) {
    
    const {sesion, attempts, setAttempts, checkWord, solutions,setSolutions} = useSesion();
    const activeLetterBox = useRef(0);
    const currentWord = useRef([]);
    const [renderWord, setRenderWord] = useState([...currentWord.current]);
    
   const checkCurrentWord =  () => {
        checkWord([...currentWord.current])
            .then((res) => {
                const newSolutions = [...solutions];
                newSolutions[keyRow] = res;
                setSolutions(newSolutions);
                
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
                    <LetterBox key={i}>{renderWord[i]}</LetterBox>
            )):(
                [...Array(sesion.wordLenght)].map((_,i) => 
                    <LetterBox key={i} solution={solutions[keyRow]? solutions[keyRow][i]:''} >{attempts[keyRow]? attempts[keyRow][i]:""}</LetterBox>
            ))}
        </div>
    )
}