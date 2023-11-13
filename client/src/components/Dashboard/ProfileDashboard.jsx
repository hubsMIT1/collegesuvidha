import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import authService from "../../services/auth_service";
import { setUserData, clearUserData } from "../../redux/userData/userAction";

const ProfileForm = () => {
  const { userData } = useSelector((state) => state.user);
  const { isAuthenticated, accessToken, refreshToken,userId } = useSelector(
    (state) => state.auth
  );

  const authData = useSelector(
    (state) => state.auth
  );
  console.log(isAuthenticated,refreshToken,userId)
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    console.log("api backend userdata")
    async function fetchUserData() {
      if (isAuthenticated) {
        try {
          const response = await authService.userData(userId, accessToken,refreshToken);
          console.log(response)
          if(response.status===200){
            dispatch(setUserData(response.data))
            // return ;
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }
    fetchUserData();
  }, [isAuthenticated,accessToken, userId,dispatch, ]);
  console.log(userData)

  useEffect(() => {
    formik.setValues({
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      contact: userData?.contact || "",
      address1: userData?.address1 || "",
      address2: userData?.address2 || "",
    });
  }, [userData]);
  const formik = useFormik({
    initialValues:{
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      contact: userData?.contact || "",
      address1: userData?.address1 || "",
      address2: userData?.address2 || "",
    },    
    validationSchema: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      //   lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      contact: yup
        .string()
        .matches(
          /^[0-9]{3,4}[ -]?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
          "Phone number is not valid"
        )
        .required("Contact number is required"),
      address1: yup.string().required("Address 1 is required"),
      //   address2: yup.string().required("Address 2 is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // console.log(formik.values,userData?.email)
  return (
    <div className="relative">
      {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 grid-cols-4">
          <div className="col-span-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500">{formik.errors.firstName}</p>
            )}
          </div>
          <div className="col-span-2">
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500">{formik.errors.lastName}</p>
            )}
          </div>
          <div className="col-span-4">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="col-span-4">
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="Contact Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="text-red-500">{formik.errors.contact}</p>
            )}
          </div>
          <div className="col-span-4">
            <input
              type="text"
              name="address1"
              id="address1"
              placeholder="Address 1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address1}
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {formik.touched.address1 && formik.errors.address1 && (
              <p className="text-red-500">{formik.errors.address1}</p>
            )}
          </div>
          <div className="col-span-4">
            <input
              type="text"
              name="address2"
              id="address2"
              placeholder="Address 2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address2}
              className="w-full p-2 rounded-md border border-gray-300"
            />
            {formik.touched.address2 && formik.errors.address2 && (
              <p className="text-red-500">{formik.errors.address2}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Update Profiles
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
