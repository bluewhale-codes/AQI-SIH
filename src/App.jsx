import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Compo/Navbar'
import AQICard from './pages/AQICard'
import Banner from './Compo/Banner'
import MyDashboard from './pages/MainDashboard.jsx/MyDashboard'
import UserDashboard from './pages/UserDashboard'
import DistrictDashboard from './assets/RegionalDashboard/DistrictDashboard'
import DetailCIty from './pages/DetailCIty'
import CorePollutantsDashboard from './pages/MainDashboard.jsx/CorePollutantsDashboard'
import PollutantsTable from './pages/MainDashboard.jsx/CorePollutantsDashboard'
import CorePollutantsList from './pages/MainDashboard.jsx/CorePollutantsDashboard'
import Source from './pages/Source'
import MetrologicalInfo from './pages/MetrologicalInfo'
import HealthReport from './pages/HealthReport'
import Health from './pages/Health'
import FeatureTabs from './pages/FeatureTabs'
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
        <Route path="/dashboard" element={<MyDashboard/>} />
        <Route path="/detail" element={<DetailCIty/>} />
        <Route path="/core" element={<CorePollutantsDashboard/>} />
        <Route path="/source" element={<Source/>}/>
        <Route path="/metro" element={<MetrologicalInfo/>}/>
        <Route path="/health" element={<HealthReport/>}/>
        <Route path="/health2" element={<Health/>}/>
        <Route path="/feature" element={<FeatureTabs/>}/>
        

       
       
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
