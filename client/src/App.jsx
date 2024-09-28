import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import RegisterModel from './models/register.model';
import MoviesPage from './pages/MoviesPage';
import ReviewPage from './pages/ReviewPage';
function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterModel />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/review" element={<ReviewPage />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
