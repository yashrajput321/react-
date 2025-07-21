import React ,{useState,useEffect, use} from 'react';
import { Header, Footer } from './components';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrectUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setIsLoading(false));
  },[]);
 

  return !isLoading ? (
    <div className='min-h-screen bg-gray-500 flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) :(
    <div className='min-h-screen bg-amber-950'></div>
  )
}

export default App
