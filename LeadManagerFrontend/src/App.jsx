import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LeadCreate from './pages/LeadCreate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='leadcreate' element={<LeadCreate/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App