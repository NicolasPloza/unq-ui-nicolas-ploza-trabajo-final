import { createContext, useContext, useState } from "react"
import { API_URL } from "../constants";
import api from "../services/api";

const sesionContext = createContext();

export function SesionProvider({children}){
    const [difficulty, setDifficulty] = useState('');
    const [sesion, setSesion] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [solutions, setSolutions] = useState([])
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
 

    const getDifficulties = async () => {
        const response =  await api.get("/difficulties");
        return response.data ;
    }

    const getSesion = async (id) => {
        const sesion = await api.get(`/difficulties/${id}`)
        return sesion.data
    }

    const checkWord = async (currentWord) => {
        try{
            const result =  await api.post("/checkWord", {
                sessionId : sesion.sessionId,
                word: currentWord.join(''), // aca convierto el array en string 
            })
            return result.data;
        } catch(error){
            return Promise.reject(error.response.data);
        }
        
    }

    return (
        <sesionContext.Provider
            value={{
                difficulty,
                setDifficulty,
                sesion,
                setSesion,
                getDifficulties,
                getSesion,
                attempts,
                setAttempts,
                checkWord,
                gameOver,
                setGameOver,
                gameWon,
                setGameWon,
                solutions,
                setSolutions,
            }}
        >
            {children}
        </sesionContext.Provider>    
    )
}

export function useSesion(){
    const context = useContext(sesionContext);
    if(context === undefined){
        throw new Error('useSesion debe ser usado de un sesionProvider');
    }
    return context;
}