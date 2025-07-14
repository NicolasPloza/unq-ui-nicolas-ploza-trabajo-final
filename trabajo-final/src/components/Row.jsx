import { useEffect, useRef, useState } from "react";
import { useSesion } from "../contexts/SesionContext"
import LetterBox from "./LetterBox";
import toast from "react-hot-toast";
import { ATTEMPTS_AMOUNT } from "../constants";

export default function Row({keyRow, isActiveRow, activeRow, setActiveRow}) {
    
    const {sesion, attempts, setAttempts, checkWord, solutions,setSolutions, gameWon, setGameWon,gameOver, setGameOver, toastId} = useSesion();
    const activeLetterBox = useRef(0);
    const currentWord = useRef([]);
    const [renderWord, setRenderWord] = useState([...currentWord.current]);
    const loading = useRef(false);

    const checkCurrentWord =  () => {
        loading.current = true;
        toast.loading('Checking word...', {id: toastId.current});
        

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

                setGameWon(res.every( sol => sol.solution === 'correct'));
                setGameOver( !!!gameWon && attempts.length === ATTEMPTS_AMOUNT-1);
                toast.dismiss(toastId.current);
            })
            .catch((error) => {
                toast.error(error.message, {id: toastId.current});
                currentWord.current = [];
                activeLetterBox.current = 0;
                setRenderWord([...currentWord.current]);
            })
            .finally(() => {
               loading.current = false;
                
            });

    }

    
    useEffect(() => {

        if(!isActiveRow ||gameWon || gameOver) return;


        const handleKeydown = (ev) => {
            if (loading.current) return;

            if(activeLetterBox.current === sesion.wordLenght && ev.key === 'Enter'){
                //loading.current = true;
                checkCurrentWord();  
                
                return;
            }

            if(activeLetterBox.current > 0 && ev.key === 'Backspace'){       
                currentWord.current[activeLetterBox.current-1] = "";
                activeLetterBox.current--;

                setRenderWord([...currentWord.current]);

                return;
            }

            if(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(ev.key) && activeLetterBox.current < sesion.wordLenght){
                currentWord.current[activeLetterBox.current] = ev.key.toLowerCase();
                activeLetterBox.current++;

                setRenderWord([...currentWord.current]);
                
                return;
            }

            if(activeLetterBox.current < sesion.wordLenght && ev.key === 'Enter'){
                toast.error('Complete the word', {id: toastId.current});
                
                return;
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