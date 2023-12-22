import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { callAuthApi, config } from "../utils/CallApi";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../_helpers/history";

import { setAuthStore, setUserDataStore } from "../redux/allAction";
import authService from "../services/auth_service";

function MyForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};

    /* validating first name */
    if (!values.firstName && props?.signup) {
      errors.firstName = "First name is required";
    } else if (values.firstName.length < 1 && props?.signup) {
      errors.firstName = "Invalid First name";
    } else {
      errors.firstName = null;
    }

    if (!values.email) {
      errors.email = "Email address is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = null;
    }

    /* validating passwords */
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length <= 6) {
      errors.password = "Password length is weak 😩";
    } else {
      errors.password = null;
    }

    /* validating password verification with initial */
    if (!values.confirmPassword && props?.signup) {
      errors.confirmPassword = "Invalid password verification";
    } else if (values.confirmPassword !== values.password && props?.signup) {
      errors.confirmPassword = "Passwords don't match 😟";
    } else {
      errors.confirmPassword = null;
    }

    // return errors;
    console.log(errors);
    if (
      errors?.confirmPassword ||
      errors.email ||
      errors?.firstName ||
      errors.password
    )
      return errors;
  };

  // const { isAuthenticated, accessToken, refreshToken } = useSelector((state) => state.auth);
  // console.log(accessToken)

  const onSubmit = async (values, { resetForm }) => {
    try {
      const route = props?.signup ? "register" : "login";
      const { email, password } = values;
      console.log(config);
      const data = props?.signup ? values : { email, password };
      console.log(data);
      // const response = await axios.post('http://localhost:3001/auth/login',
      //     const response = await axios.post('http://localhost:3001/auth/login', data, {
      //       withCredentials: true, // equivalent to credentials: 'include'
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      // });
      const from = history.location?.state?.from || { pathname: "/" };
      const response = await authService.handleRegistration(route, data);
      if (response.status === 200) {
        // console.log(response.data)
        setAuthStore(response.data, dispatch);
        // setUserDataStore(response.data,dispatch)
        navigate(from);
        // navigate('/');
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
    // return values;
  };

  console.log(props?.login, props?.signup);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit,
  });
  // console.log('Formik values:', formik.values);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
            {props?.signup ? "Registration" : "Login"}
          </h1>

          <div
            className={
              props?.signup ? `grid gap-2 md:grid-cols-2 md:gap-4 mt-6` : "mt-6"
            }
          >
            {props?.signup ? (
              <div>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="block text-sm font-semibold text-red-500">
                    {" "}
                    *{formik.errors.firstName}
                  </div>
                ) : (
                  <div>&nbsp;</div>
                )}
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="firstName"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
              </div>
            ) : null}
            {props?.signup ? (
              <div>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="relative t-4 text-sm font-semibold text-red-500">
                    {" "}
                    *{formik.errors.lastName}
                  </div>
                ) : (
                  <div>&nbsp;</div>
                )}
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="lastName"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
              </div>
            ) : (
              " "
            )}

            <div>
              {formik.touched.email && formik.errors.email ? (
                <div className="block text-sm font-semibold text-red-500">
                  {" "}
                  *{formik.errors.email}
                </div>
              ) : (
                <div>&nbsp;</div>
              )}
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
            </div>

            <div>&nbsp;</div>
            <div>
              {formik.touched.password && formik.errors.password ? (
                <div className="block text-sm font-semibold text-red-500">
                  {" "}
                  *{formik.errors.password}
                </div>
              ) : (
                <div>&nbsp;</div>
              )}
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
                placeholder="Password (5 characters and above)"
                {...formik.getFieldProps("password")}
              />
              {props?.login && (
                <Link
                  href="#"
                  className="text-xs text-purple-600 hover:underline"
                >
                  Forget Password?
                </Link>
              )}
            </div>
            {props?.signup ? (
              <div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="block text-sm font-semibold text-red-500">
                    {" "}
                    *{formik.errors.confirmPassword}
                  </div>
                ) : (
                  <div>&nbsp;</div>
                )}
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              {props?.signup ? "Create Account 🚀" : "Login"}
            </button>
          </div>

          {props?.signup && (
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark"
                to={"#"}
              >
                {" "}
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark"
                to={"#"}
              >
                Privacy Policy
              </Link>
            </div>
          )}
          {props?.signup ? (
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-purple-600 hover:underline"
                onClick={() => {
                  formik.resetForm();
                }}
              >
                Log in
              </Link>
            </p>
          ) : (
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="font-medium text-purple-600 hover:underline"
                onClick={() => {
                  formik.resetForm();
                }}
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
export default MyForm;
