import { useEffect, useState } from "react";
import KeyBoardRow from "./KeyBoardRow";
import { useSesion } from "../contexts/SesionContext";
import { useBoard } from "../contexts/BoardContext";

export default function KeyBoard(){

    const {renderWord} = useBoard();
    const {solutions} = useSesion();
    const [styledRows, setStyledRows] = useState({
        first: [],
        second: [],
        third: [],
    });

    const baseRows = {
    first: "qwertyuiop".split(""),
    second: "asdfghjklñ".split(""),
    third: "zxcvbnm".split(""),
  };



  useEffect(() => {
    
    const styleChar = (char) => {
      const found = solutions.flat().find(item => item.letter === char);
      return {
        letter: char,
        style: found?.solution || ""
      };
    };

    setStyledRows({
      first: baseRows.first.map(styleChar),
      second: baseRows.second.map(styleChar),
      third: ['Backspace', ...baseRows.third, 'Enter'].map(styleChar),
    });

  }, [solutions, renderWord]);

  return (
    <div className="keyboard flex column">
      <KeyBoardRow keys={styledRows.first} />
      <KeyBoardRow keys={styledRows.second} />
      <KeyBoardRow keys={styledRows.third} />
    </div>
  );
}