
import { createContext, useContext, useEffect, useReducer } from 'react';
import './App.scss'
import Routing from './components/Routing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { initialState, reducer } from './Reducers/userReducer';
export const userContext =createContext()
const ConextRoute = ()=>{
 
  const{state,dispatch}=useContext(userContext)
  console.log("app",state)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user-info"))
    if(user){
      dispatch({type:"USER",payload:user})
    }


  },[])

  return(
  
  <Routing></Routing>
  
  )
}

function App() {
  const[state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
  <userContext.Provider value={{state,dispatch}}>
    <ConextRoute></ConextRoute>
  </userContext.Provider>
  <ToastContainer />
    </div>
  );
}

export default App;
