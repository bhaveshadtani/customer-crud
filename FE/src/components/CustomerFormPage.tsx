import React, { useState } from "react";
import CustomerForm from "./CustomerForm";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CustomerFormPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: string; address: string; phone: string }) => {
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch(`${API_URL}/customer/add-edit-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values)
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: "Customer created successfully!", type: "success" });
        setTimeout(() => navigate("/customers"), 1000);
      } else {
        setToast({ message: data.message || "Error", type: "error" });
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <CustomerForm onSubmit={handleSubmit} loading={loading} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CustomerFormPage;
