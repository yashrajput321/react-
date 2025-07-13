import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './context/UserContextProvider'

function App() {

  return (
    <UserContextProvider>
      <h1 className='bg-green-900 text-gray-200 text-center'>Cheemu mera naam</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
