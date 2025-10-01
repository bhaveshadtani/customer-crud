/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";
import useCustomerStore from "../store/useCustomerStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const CustomerList: React.FC = () => {
  const { setSelectedCustomer } = useCustomerStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const { data, isLoading, error } = useQuery({
    queryKey: ["customers", page, limit],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/customer/customer-list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ page, limit })
      });
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/customer/delete-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, confirm: true })
      });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setToast({ message: "Customer deleted successfully!", type: "success" });
      setConfirmId(null);
    },
    onError: () => {
      setToast({ message: "Failed to delete customer", type: "error" });
    }
  });

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/");
      } else {
        setToast({ message: "Logout failed", type: "error" });
      }
    } catch {
      setToast({ message: "Logout failed", type: "error" });
    }
  };


  if (isLoading) return <div className="flex justify-center items-center h-screen"><span className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></span></div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error loading customers</div>;

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Customer List</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => { navigate('/add-customer'); setSelectedCustomer(null) }}
          >Add Customer</button>
        </div>

        {/* Pagination Info */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-semibold">Total Records:</span> {data.total}
          </div>
          <div>
            <span className="font-semibold">Page:</span> {data.page} / {Math.ceil(data.total / limit)}
          </div>
        </div>

        <table className="w-full mb-6 border">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.customers.map((c: any) => (
              <tr key={c._id} className="border-t">
                <td className="py-2 px-4">{c._id}</td>
                <td className="py-2 px-4">{c.name}</td>
                <td className="py-2 px-4">{c.address}</td>
                <td className="py-2 px-4">{c.phone}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedCustomer(c);
                      navigate(`/edit-customer/${c._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => setConfirmId(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >Previous</button>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(data.total / limit)}
          >Next</button>
        </div>

        {/* Confirmation Popup */}
        {confirmId && (
          <div className="fixed inset-0 bg-gray-400 opacity-95 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-xl text-center">
              <p className="mb-4">Are you sure you want to delete this customer?</p>
              <div className="flex gap-4 justify-center">
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => deleteMutation.mutate(confirmId)}>Yes, Delete</button>
                <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setConfirmId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default CustomerList;
