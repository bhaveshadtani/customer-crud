import useCustomerStore from "../store/useCustomerStore";
import { useNavigate, useParams } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import Toast from "./Toast";
import { useState } from "react";
const CustomerFormPage: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCustomer, clearSelectedCustomer } = useCustomerStore();
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string; address: string; phone: string }) => {
    setLoading(true);
    setToast(null);
    try {
      const res = await fetch(`${API_URL}/customer/add-edit-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          id ? { ...values, id } : values // Pass id if editing
        ),
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: id ? "Customer updated!" : "Customer created!", type: "success" });
        clearSelectedCustomer();
        navigate("/customers")
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
      <CustomerForm
        onSubmit={handleSubmit}
        loading={loading}
        initialValues={{
          name: selectedCustomer?.name || "",
          address: selectedCustomer?.address || "",
          phone: selectedCustomer?.phone || "",
        }}
        isEditMode={Boolean(selectedCustomer)}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CustomerFormPage;
