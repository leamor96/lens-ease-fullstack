import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(()=>{
    fetch("http://localhost:3001/api/auth/signin", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: "leamor96@gmail.com",
        password: "Pricer@1234!!",
      }),
    })
    .then((res)=>res.json())
    .then((json)=>{
      console.log(json);
    })
    .catch((e)=>{
      console.log(e);   
    })
  },[]);
  return (
    <div className="App"></div>
  );
}

export default App;
