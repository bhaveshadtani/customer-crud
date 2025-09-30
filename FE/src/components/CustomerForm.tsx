import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CustomerFormProps {
  onSubmit: (values: { name: string; address: string; phone: string }) => void;
  loading: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
});

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: { name: "", address: "", phone: "" },
    validationSchema,
    onSubmit,
  });

  return (
    <form className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg" onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Add Customer</h2>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Name</label>
        <input
          name="name"
          type="text"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Address</label>
        <input
          name="address"
          type="text"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'}`}
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.address}</div>
        )}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Phone</label>
        <input
          name="phone"
          type="text"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
        )}
      </div>
      <button
        type="submit"
        className={`w-full py-2 text-lg font-bold rounded-lg transition-colors duration-200 ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"} text-white shadow`}
        disabled={loading}
      >
        {loading ? <span className="animate-pulse">Saving...</span> : "Add Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
