import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

function Myapp(){
  return (<h1>
    Cheemu The Great
  </h1>
  )
}

// const reactElement = {
//   type:'a',
//   props:{
//       href : "http://google.com",
//       target:"_blank"
//   },
//   children:"Click me to visit google"
// }

const anotherElement = (
  <a href="https://google.com" target="_blank">
    Visit Google
  </a>
)

const reactElement = React.createElement(
  'a',
  {href:"https://google.com",target:"_blank"},
  "click me to visit Google"  
)

createRoot(document.getElementById('root')).render(
  
  <App/>
)
