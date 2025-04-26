import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter, setcounter] = useState(0)


  const increaseValue = ()=>{
    if(counter<20){
      setcounter(counter+1)
    }
  }

  const decreaseValue = () =>{
    if(counter>0){
      setcounter(counter-1)
    }
    
  }
  

  return (
    <>
      <h1>Chai aur cheemu</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={increaseValue} >Increase Value</button>
      <button onClick={decreaseValue} >Decrease Value</button>
    </>
  )
}

export default App
