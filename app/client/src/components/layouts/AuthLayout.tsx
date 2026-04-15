import AuthGuard from "@/features/auth/guards/AuthGuard"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <AuthGuard><Outlet /></AuthGuard>
  )
}

export default AuthLayout