import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CarDetails from './pages/CarDetails'
import PostAd from './pages/PostAd'
import Profile from './pages/Profile'
import { AuthProvider } from './modules/auth/AuthContext'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/post-ad" element={<PostAd />} />
            <Route path="/post" element={<Navigate to="/post-ad" replace />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App