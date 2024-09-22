import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import RegisterModel from './models/register.model';
function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterModel />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
