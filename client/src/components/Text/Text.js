import React, {useState} from 'react'
import styles from './Text.module.css';

export default function Text(props) {
  const [input, setInput] = useState("");
  function changeHandler(e){
    setInput(e.target.value);
  }

  function clickHandler(){
    if(input !== ""){
      console.log(props.id);
      setInput("");
    }else{
      console.log("Empty")
    }
  }

  return (
    <div>
        <input id={props.id} type="text" onChange={changeHandler}value={input}/>
        <button onClick={clickHandler} className="btn btn-primary"> Add </button>
    </div>
  )
}
