import { useEffect, useState } from "react"
import { useSesion } from "../contexts/SesionContext";
import { ATTEMPTS_AMOUNT } from "../constants";
import Row from "./Row";

export default function Board(){
    const [loading, setLoading] = useState();
    const {sesion, attempts} = useSesion();
    const [activeRow, setActiveRow] = useState(0);


    return (
        <div className="flex column">
            {[...Array(ATTEMPTS_AMOUNT)]
                .map((_,i) => <Row key={i} keyRow={i} activeRow={activeRow} setActiveRow={setActiveRow} isActiveRow={i === activeRow}/>)}
        </div>
    )
}