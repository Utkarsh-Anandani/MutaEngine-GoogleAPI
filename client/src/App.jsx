import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import HomePage from "./pages/HomePage"
import ForgotPass from "./pages/ForgotPass"
import ResetPass from "./pages/ResetPass"
import { useState } from "react"

function App() {
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState('');

  return (
    <Routes>
      <Route path={'/login'} element={
        <Login setToken={setToken} setUserDetails={setUserDetails}/>
      } />

      <Route path={'/signup'} element={
        <Signup setToken={setToken} setUserDetails={setUserDetails}/>
      } />

      <Route index element={
        <HomePage token={token} userDetails={userDetails}/>
      } />

      <Route path={'/forgot-password'} element={
        <ForgotPass />
      } />

      <Route path={'/reset-password/:email'} element={
        <ResetPass />
      } />
    </Routes>
  )
}

export default App
