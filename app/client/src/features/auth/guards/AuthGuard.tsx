import { Navigate } from "react-router-dom";

import { useUser } from "@/context/UserContext.tsx";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { pending, authenticated } = useUser();

  if (pending) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>{children}</div>
  )
}

export default AuthGuard