import { useState } from 'react'


function App() {
  const [color,setColor] = useState("olive")

  return (
    <div className='w-full h-screen'
    style={{backgroundColor:color}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
      test
      </div>

    </div>
  )
}

export default App
