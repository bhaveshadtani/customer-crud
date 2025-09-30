

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  type: "login" | "register";
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, loading, type }) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: ({ email, password }) => onSubmit(email, password),
  });

  return (
    <form
      className="max-w-sm mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">
        {type === "login" ? "Login to your account" : "Create an account"}
      </h2>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className={`w-full py-2 text-lg font-bold rounded-lg transition-colors duration-200 ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"} text-white shadow`}
        disabled={loading}
      >
        {loading ? (
          <span className="animate-pulse">Loading...</span>
        ) : type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
