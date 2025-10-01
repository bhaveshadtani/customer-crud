import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface CustomerFormValues {
  name: string;
  address: string;
  phone: string;
}

interface CustomerFormProps {
  onSubmit: (values: CustomerFormValues) => void;
  loading: boolean;
  initialValues: CustomerFormValues;
  isEditMode: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
});

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, loading, initialValues, isEditMode }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form
      className="w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        {isEditMode ? "Edit Customer" : "Add Customer"}
      </h2>

      {/* Name */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <label className="w-32 text-sm font-semibold text-gray-700 flex-shrink-0">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
              }`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-xs mt-1 ml-32">{formik.errors.name}</div>
        )}
      </div>

      {/* Address */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <label className="w-32 text-sm font-semibold text-gray-700 flex-shrink-0">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            name="address"
            type="text"
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.address && formik.errors.address ? "border-red-500" : "border-gray-300"
              }`}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-xs mt-1 ml-32">{formik.errors.address}</div>
        )}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <label className="w-32 text-sm font-semibold text-gray-700 flex-shrink-0">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="text"
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-xs mt-1 ml-32">{formik.errors.phone}</div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          className="w-1/3 py-2 text-lg font-bold rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors duration-200 shadow"
          onClick={() => navigate("/customers")}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`w-1/3 py-2 text-lg font-bold rounded-lg transition-colors duration-200 ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white shadow`}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">{isEditMode ? "Updating..." : "Saving..."}</span>
          ) : isEditMode ? (
            "Update Customer"
          ) : (
            "Add Customer"
          )}
        </button>
      </div>

    </form>
  );
};

export default CustomerForm;
