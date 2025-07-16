import { createContext, useContext, useRef, useState } from "react";
import { useSesion } from "./SesionContext";
import toast from "react-hot-toast";
import { ATTEMPTS_AMOUNT } from "../constants";

const boardContext = createContext();

export function BoardProvider({children}){

    const {sesion, checkWord, solutions, setSolutions, gameWon, setGameWon,gameOver, setGameOver, toastId,sesionLoading} = useSesion();

    const [activeRow, setActiveRow] = useState(0);
    const activeLetter = useRef({letter: '',  position: 0});
    const [renderWord, setRenderWord] = useState([]);


    const checkCurrentWord =  () => {
       
        sesionLoading.current = true;
        toast.loading('Checking word...', {id: toastId.current});

        checkWord(renderWord)
            .then((res) => {
                solutions[activeRow] = res;
                setSolutions([...solutions]);
                
                setGameWon(res.every( sol => sol.solution === 'correct'));
                setGameOver( !!!gameWon && activeRow === ATTEMPTS_AMOUNT-1);

                setActiveRow(activeRow+1);

                setRenderWord([]);

                
                toast.dismiss(toastId.current);
            })
            .catch((error) => {
                toast.error(error.message, {id: toastId.current});
                setRenderWord([]);
            })
            .finally(() => {
               sesionLoading.current = false;
               activeLetter.current.position = 0;
            });

    }

    

    const handleKeydown = (ev) => {
        if (sesionLoading.current) return;

        if(activeLetter.current.position === sesion.wordLenght && ev.key === 'Enter'){
            checkCurrentWord();  
            
            return;
        }

        if(activeLetter.current.position > 0 && ev.key === 'Backspace'){       
            renderWord[activeLetter.current.position-1] = "";
            activeLetter.current.position--;

            setRenderWord([...renderWord]);

            return;
        }

        if(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(ev.key) && activeLetter.current.position < sesion.wordLenght){
            //activeLetter.current.letter =  ev.key.toLowerCase();
            renderWord[activeLetter.current.position] = ev.key.toLowerCase();
            setRenderWord([...renderWord]);     
            activeLetter.current.position++;       
            return;
        }

        if(activeLetter.current.position < sesion.wordLenght && ev.key === 'Enter'){
            toast.error('Complete the word', {id: toastId.current});
            
            return;
    }
        
    }
        
    

    return(
        <boardContext.Provider
            value={{
                activeRow,
                activeLetter,
                handleKeydown,
                renderWord,
                setRenderWord,
                setActiveRow,
            }}
        >
            {children}
        </boardContext.Provider>
    )
}

export function useBoard(){
    const context = useContext(boardContext);
    if(context === undefined){
        throw new Error('useBoard deb ser usado dentro de un boardProvider');
    }
    return context;
}
