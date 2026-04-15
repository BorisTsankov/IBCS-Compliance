import { Routes, Route } from "react-router-dom"
import { Landing, Login, Register } from "./pages/(auth)"
import { Dashboard } from "./pages/(root)"
import AuthLayout from "./components/layouts/AuthLayout"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
