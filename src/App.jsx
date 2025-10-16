import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Compo/Navbar'
import AQICard from './pages/AQICard'
import Banner from './Compo/Banner'

import UserDashboard from './pages/UserDashboard'
import DistrictDashboard from './assets/RegionalDashboard/DistrictDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
     <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path="/MeriHawa" element={<UserDashboard/>} />
        <Route path="/organization" element={<Banner/>} />
        <Route path="/reagion" element={<DistrictDashboard/>} />
      
       
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
