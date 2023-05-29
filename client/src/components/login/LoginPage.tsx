import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginFormType } from "../../@types"; 
import AuthContext from "../../context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from "react-loader-spinner";
import authService from "../../services/auth.service";
import "./LoginPage.css";

const LoginPage = () => {
     const nav = useNavigate();
     //prevent double submit:
     const [isLoading, setIsLoading] = useState(false);
     const [errMessage, setErrMessage] = useState<string | undefined>(
       undefined
     );
     const { isLoggedIn, login } = useContext(AuthContext);

     const initialValues = {
       email: "",
       password: "",
     };

     //Validations:
     const validationSchema = Yup.object({
       email: Yup.string().email("Must be a valid email").required(),
       password: Yup.string().min(3, "Password is too short").required(),
     });

     //if all is valid=> this method is invoked
     const handleLogin = (formValues: LoginFormType) => {
       setIsLoading(true);

       const { email, password } = formValues;
       authService
         .login(email, password)
         .then((res) => {
           const token = res.accessToken;
           const email = res.email;
           const username = res.username;
           //update the context...
           login(username, email, token);
           nav("/");
         })
         .catch((e) => {
           console.log(e);
           alert(e); //swal //modal
           setErrMessage(JSON.stringify(e.response.data));
         })
         .finally(() => {
           setIsLoading(false);
         });
     };
     if (isLoggedIn) {
       return <Navigate to="/" />;
     }
  return (
    <div className="login-page">
 <div className="login-error">{errMessage && <div>${errMessage}</div>}</div>
      <div className="loader-container">
        {isLoading && (
          <ColorRing
            visible={true}
            height={80}
            width={80}
            colors={["#ffc107", "#343a40", "#e15b64", "#f47e60", "#f8b26a"]}
          />
        )}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form className="login-form">
          <div>
            <h2>Login</h2>
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
              className="alert alert-danger"
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
              className="alert alert-danger"
            />
          </div>
          <br />
          <div className="col-12">
            <button
              disabled={isLoading}
              className="btn btn-warning"
              type="submit"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
