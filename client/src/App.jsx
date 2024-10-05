import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import RegisterModel from './models/register.model';
import MoviesPage from './pages/MoviesPage';
import ReviewPage from './pages/ReviewPage';
import Profile from './pages/Profile';
import MovieList from './hooks/useIMDBLink';
import AccountSettings from './pages/AccountSettingPage';
// import getUserDetails from './pages/GetUserDetails';
function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterModel />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/review" element={<ReviewPage />} />
       <Route path='/profile' element={<Profile />}/>
       <Route path="/user-account-setting" element={<AccountSettings/>} />      
        
      </Routes>
    </Router>
    </>
  )
}

export default App
