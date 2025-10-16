import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Compo/Navbar'
import AQICard from './pages/AQICard'


import UserDashboard from './pages/UserDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path="/MeriHawa" element={<UserDashboard/>} />
        <Route path="/card" element={<AQICard/>} />
      
       
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
