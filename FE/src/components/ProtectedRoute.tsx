import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
