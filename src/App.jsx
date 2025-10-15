import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/home" element={<Navbar/>} />
       
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
