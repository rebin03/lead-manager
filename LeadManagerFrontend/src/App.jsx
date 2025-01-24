import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LeadCreate from './pages/LeadCreate'
import LeadList from './pages/LeadList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='leadcreate' element={<LeadCreate/>}/>
        <Route path='leadlist' element={<LeadList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App