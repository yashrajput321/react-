import { useState,useCallback ,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")


  //useRef hook
  const passwordRef = useRef(null)

  const copytToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str+="1234567890"
    }

    if(characterAllowed){
      str+="!@#$%^&*()?><}|{[]"
    }

    for(let i=1;i<=length;i++){
      const char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char)
    }

    

    setPassword(pass)},[length,numberAllowed,characterAllowed,setPassword])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 m-8 text-orange-700 bg-gray-700 text-center'>
        <h1 className='text-white text-center text-2xl font-semibold mb-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type='text'
          value={password}
          className=' outline-none w-full py-1 px-3 bg-white text-lg font-semibold'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copytToClipboard}
          type="button" 
          className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-m gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={8}
              max={30}
              value={length} 
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Lenght:{length}</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>{
                  setNumberAllowed((prev)=> !prev)
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                onChange={()=>{
                  setCharacterAllowed((prev)=> !prev)
                }}
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
