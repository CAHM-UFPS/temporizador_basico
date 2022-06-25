import { useState, useEffect, useRef } from "react";

function App() {
  const [segundos, setSegundos]=useState(0);
  const [minutos, setMinutos]=useState(0);
  const [hayIntervalo, setHayIntervalo]=useState(false);
  const idIntervalo=useRef(null);

  function inicio(){
    if(minutos>0){
      setHayIntervalo(true);

      if(!hayIntervalo){
        idIntervalo.current=setInterval(conteo, 1000);
      }
    }
  }

  function conteo(){
    setSegundos((seg)=>seg-1);
  }

  useEffect(()=>{
    if(segundos<0){
      setSegundos(59);
      if(minutos>0){
        setMinutos((min)=>min-1);
      }
    }

    detener();
  }, [segundos]);

  function aumentar(){
    if(minutos>=0){
      setMinutos((inc)=>inc+1);
      setSegundos(0);
    }
  }

  function disminuir(){
    if(minutos>0){
      setMinutos((dec)=>dec-1);
      setSegundos(0);
    }
  }

  function detener(){
    if(minutos===0 && segundos===0){
      console.log("Detener");
      clearInterval(idIntervalo.current);
      idIntervalo.current=null;
      setHayIntervalo(false);
    }
  }

  return (
    <div>
      <h1 className={minutos<1? 'numeros': 'normal'}>{`${minutos>=0 && minutos<=9? `0${minutos}`:`${minutos}`}:${segundos>=0 && segundos<=9? `0${segundos}`:`${segundos}`}`}</h1>
      <input type='submit' value='Comenzar' onClick={inicio}/>
      <input type='submit' value='+' onClick={aumentar}/>
      <input type='submit' value='-' onClick={disminuir}/>
    </div>
  )
}

export default App
