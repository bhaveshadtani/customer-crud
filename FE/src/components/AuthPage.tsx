import React, { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import Toast from "./Toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthPage: React.FC = () => {
  const [type, setType] = useState<'login' | 'register'>('login');
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ email: string; password: string } | null>(null);

  // Reset formData when type changes
  useEffect(() => {
    setFormData(null);
  }, [type]);
  const {
    data,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["auth", type, formData],
    queryFn: async () => {
      if (!formData) return null;
      const res = await fetch(`${API_URL}/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error");
      return result;
    },
    enabled: false
  });

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (data) {
      // Store user in zustand store
      if (data.user) {
        setUser(data.user);
      }
      setToast({ message: `${type === 'login' ? 'Login' : 'Register'} successful!`, type: "success" });
      setTimeout(() => navigate("/customers"), 1000);
    }
    if (error) {
      setToast({ message: (error as Error).message || "Network error", type: "error" });
    }
  }, [data, error, type, navigate, setUser]);

  const handleAuth = (email: string, password: string) => {
    setFormData({ email, password });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${type === 'login' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          onClick={() => setType('login')}
        >Login</button>
        <button
          className={`px-4 py-2 rounded ${type === 'register' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          onClick={() => setType('register')}
        >Register</button>
      </div>
      <AuthForm onSubmit={handleAuth} loading={isFetching} type={type} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AuthPage;
