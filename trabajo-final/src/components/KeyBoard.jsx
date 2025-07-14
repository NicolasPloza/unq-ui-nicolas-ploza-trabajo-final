import KeyBoardRow from "./KeyBoardRow";

export default function KeyBoard(){

    const lastRow = "zxcvbnm".split('');

    return (
        <div className="keyboard flex column">
            <KeyBoardRow keys= {"qwertyuiop".split('')}/>
            <KeyBoardRow keys={"asdfghjklñ".split('')}/>
            <KeyBoardRow keys={['Backspace'].concat(lastRow).concat('Enter')}/>
        </div>
    )
}