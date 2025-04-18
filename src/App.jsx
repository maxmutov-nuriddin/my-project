import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/authentication/LoginPage'
import RegisterPage from './pages/authentication/registerPage'
import HomePage from './pages/global/homePage'

import LayoutPage from './components/layout/layout'
import SecondPage from './pages/global/secondPage'
import ThirdPage from './pages/global/thirdPage'

import './App.css'

const isAuthenticated = () => {
  return localStorage.getItem('authToken');
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <LayoutPage /> : <RegisterPage />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/Second" element={<SecondPage />} />
          <Route path="/Third" element={<ThirdPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
