import "./Sign.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useTaskstore from "../../stores/taskStore"

interface FormValues {
  email: string
  password: string
}
interface ApiResponse {
  result: any
  // auth: string;
}
const Signin = () => {
  const navigate = useNavigate()
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values)
      fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          if (!result.ok) {
            throw new Error("Invalid email or password")
          }
          return result.json()
        })
        .then((result1: ApiResponse) => {
          console.log(result1)
          localStorage.setItem("auth", JSON.stringify(result1))
          toast.success("Login Successfull", {
            position: "top-center",
            autoClose: 1000,
          })
          navigate("/")
          console.log(useTaskstore)
        })
        .catch((error) => {
          console.error("Error submitting form:", error)
          toast.error(error.message, {
            position: "top-center",
            autoClose: 1000,
          })
        })
        .finally(() => {
          resetForm()
        })
    },
  })

  return (
    <div className="signup-form">
      <div className="signup_form">
        <form onSubmit={formik.handleSubmit}>
          <h4>Sign In</h4>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <button type="submit" className="button">
              {" "}
              Sign In{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signin
