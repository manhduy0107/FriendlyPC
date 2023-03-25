import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React from "react";
import "./Login.css";
import logo from "../../assets/imgs/friendly-pc-logo.png";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { BACKEND_DOMAIN_API } from "../../global/Backend-api";

const validation = Yup.object({
  email: Yup.string()
    .email("Bạn cần nhập đúng định dạng email!")
    .required("Bạn cần cung cấp email!"),
  password: Yup.string().required("Bạn cần nhập mật khẩu!"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    values,
    touched,
    isValid,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit(values) {
      getAllUser(values);
    },
  });
  const getAllUser = async (user) => {
    const findAllUser = await axios.get(`${BACKEND_DOMAIN_API}/api/v1/users`);

    const findUserLogin = findAllUser.data.find(
      (item) => item.email === user.email
    );
    if (findUserLogin && findUserLogin.password === user.password) {
      alert("dang nhap thanh cong");
      localStorage.setItem("userLogin", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("sai tai khoan mau khai");
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5" onSubmit={handleSubmit}>
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src={logo} style={{ width: "195px" }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are Friendly PC Team</h4>
            </div>

            <p>Please login to your account!</p>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && !isValid && errors.email && (
              <p className="red">{errors.email}</p>
            )}
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && !isValid && errors.password && (
              <p className="red">{errors.password}</p>
            )}

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                type="submit"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Sign in
              </MDBBtn>
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn
                outline
                className="mx-2"
                color="danger"
                type="button"
                value="Đăng ký"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are Friendly PC </h4>
              <p className="small mb-0">
                Friendly PC is a sales website specializing in providing
                high-end technology products such as computers, laptops,
                computer components, technology accessories, etc. With a team of
                professional, dedicated staff and long-term experience in the
                technology field, Friendly PC is committed to providing
                customers with quality products, competitive prices and
                excellent after-sales service. On Friendly PC, customers can
                find products of famous brands like Apple, Dell, HP, Asus,
                Lenovo etc. In addition, Friendly PC also provides reliable
                warranty and repair services, giving customers peace of mind
                when using its products.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
