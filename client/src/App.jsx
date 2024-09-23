import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import HomePage from "./pages/HomePage"
import ForgotPass from "./pages/ForgotPass"
import ResetPass from "./pages/ResetPass"
import PaymentButton from "./pages/PaymentPage"

function App() {

  return (
    <Routes>
      <Route path={'/login'} element={
        <Login />
      } />

      <Route path={'/signup'} element={
        <Signup />
      } />

      <Route index element={
        <HomePage />
      } />

      <Route path={'/forgot-password'} element={
        <ForgotPass />
      } />

      <Route path={'/reset-password/:email'} element={
        <ResetPass />
      } />

      <Route path={'/payment'} element={
        <PaymentButton />
      } />
    </Routes>
  )
}

export default App
