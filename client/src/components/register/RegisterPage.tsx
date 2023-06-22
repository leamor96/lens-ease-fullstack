import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterFormType } from "../../@types";
import AuthContext from "../../context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../../services/auth.service";
import "./RegisterPage.css";
import LoadingSpinner from "../utils/LoadingSpinner";

const RegisterPage = () => {
  const nav = useNavigate();
  //prevent double submit:
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
  const { isLoggedIn } = useContext(AuthContext);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  //Validations:
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Name must be at least 2 characters long and a maximum of 30.")
      .required(),
    email: Yup.string()
      .email("Must be a valid email (e.g., example@example.com).")
      .required(),
    password: Yup.string()
      .min(
        3,
        "Password needs to be 8-30 characters,at least one lowercase letter (a-z),at least one uppercase letter (A-Z),at least one digit (0-9),and at least one special character from #$@!%&*?"
      )
      .required(),
  });

  //submit function:if all is valid=> this method is invoked
  const handleRegister = (formValues: RegisterFormType) => {
    setIsLoading(true);

    const { username, email, password } = formValues;
    authService
      .register(username, email, password)
      .then((res) => {
        console.log(res.data);
        //swal
        nav("/login");
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data && e.response.data.message) {
          const errorMessage = e.response.data.message;
          const formattedErrorMessage = "Error: " + errorMessage;
          alert(formattedErrorMessage);
          setErrMessage(formattedErrorMessage);
        } else {
          alert("An error occurred. Please try again later.");
          setErrMessage("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register-page">
      <div className="register-error">
        {errMessage && <div>{errMessage}</div>}
      </div>
      {isLoading && <LoadingSpinner />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        <Form className="register-form">
          <div>
            <h2>Register</h2>
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <Field
              name="username"
              type="text"
              className="form-control"
              id="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="alert alert-warning"
            />
          </div>
          <br />
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="form-control"
              id="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-warning"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="form-control"
              id="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-warning"
            />
          </div>
          <br />
          <div className="col-12">
            <button
              disabled={isLoading}
              className="btn btn-warning"
              type="submit"
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
