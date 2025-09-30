import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const toastColors = {
  success: "bg-green-100 border-green-500 text-green-700",
  error: "bg-red-100 border-red-500 text-red-700",
  info: "bg-blue-100 border-blue-500 text-blue-700"
};

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => (
  <div className={`fixed top-6 right-6 px-6 py-3 rounded shadow-lg border-l-4 z-50 ${toastColors[type]}`}>
    <div className="flex items-center justify-between gap-4">
      <span>{message}</span>
      <button className="ml-4 text-lg font-bold" onClick={onClose}>&times;</button>
    </div>
  </div>
);

export default Toast;
