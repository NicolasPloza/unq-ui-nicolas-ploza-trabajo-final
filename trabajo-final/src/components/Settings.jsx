import { useEffect, useState } from "react";
import { useSesion } from "../contexts/SesionContext"
import toast from "react-hot-toast"
import '../App.css'

export default function Settings(){
    
    const {getDifficulties,getSesion,setSesion} =  useSesion();
    const[difficulties, setDifficulties] = useState([]);
    const [loading, setLoading] = useState(true)    

    
    const handleClick = (difficulty) => {
        getSesion(difficulty.id)
            .then((res) => {
                setSesion(res);
            })
            .catch((error) => toast.error(error))
    }

    useEffect( () => {
        setLoading(true);
        getDifficulties()
            .then((res) => {
                setDifficulties(res);
            } )
            .catch((error) => toast.error(error));
        setLoading(false);
    },[])

    if(loading){
        return <div>Loading...</div>
    }

    
    return(
        <div className="flex column">
            {difficulties.map((dif) => ( <button className="difficulty-button" key={dif.id} onClick={() => handleClick(dif)} >{dif.name}</button>))}
        </div>   
    )
}