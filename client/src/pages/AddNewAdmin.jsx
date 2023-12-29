import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import authService from "../services/auth_service";
import { useDispatch, useSelector } from "react-redux";

function NewAdminForm() {
  const { accessToken, refreshToken, userId } = useSelector(
    (state) => state.auth
  );
  const validate = (values) => {
    const errors = {};

    if (!values.adminId) {
      errors.adminId = "Admin ID is required";
    }

    return errors;
  };
  const dispatch = useDispatch();
  const onSubmit = async (value, { resetForm }) => {
    // Add your logic to submit the form (e.g., make an API call)
    // console.log("Submit form with values:", value);
    const res = await authService.addNewAdminHandler(
      value,
      userId,
      accessToken,
      refreshToken,
      dispatch
    );
    // console.log(res?.message);
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      adminId: "",
    },
    validate,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Add New Admin
        </h1>

        <div className="mt-6">
          {formik.touched.adminId && formik.errors.adminId ? (
            <div className="block text-sm font-semibold text-red-500">
              *{formik.errors.adminId}
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            name="adminId"
            placeholder="Admin ID"
            {...formik.getFieldProps("adminId")}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Add Admin
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          <Link
            to={"/dashboard"} // Replace with the path to your dashboard
            className="font-medium text-purple-600 hover:underline"
          >
            Go back to Dashboard
          </Link>
        </p>
      </div>
    </form>
  );
}

export default NewAdminForm;
