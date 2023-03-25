import React from "react";
import "./style.scss";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { uuid } from "../../utils";
import axios from "axios";
import { BACKEND_DOMAIN_API } from "../../global/Backend-api";

const validattion = Yup.object({
  email: Yup.string("Bạn cần nhập đúng định dạng email!")
    .email("Bạn cần nhập đúng định dạng email!")
    .required("Bạn cần cung cấp email!"),
  password: Yup.string().required("Bạn cần nhập mật khẩu!"),
  cfPassword: Yup.string().required("Bạn cần nhập lại mật khẩu!"),
  username: Yup.string().required("Bạn cần nhập username!"),
  phone: Yup.string().required("Bạn cần nhập số điện thoại!"),
});
const Register = () => {
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
      id: uuid(),
      email: "",
      password: "",
      username: "",
      name: "",
      phone: "",
    },
    validationSchema: validattion,
    onSubmit(values) {
      handleRegister(values);
    },
  });

  const handleRegister = async (user) => {
    const listPrevUser = await axios.get(`${BACKEND_DOMAIN_API}/api/v1/users`);
    const arrUser = listPrevUser.data;
    const findExistUser = arrUser.findIndex(
      (item) => item.email === user.email
    );
    if (findExistUser >= 0) {
      alert("Email đã tồn tại!");
    } else {
      if (user.password === user.cfPassword) {
        delete user.cfPassword;
        const requestRegiter = await axios.post(
          `${BACKEND_DOMAIN_API}/api/v1/users`,
          user
        );
        if (requestRegiter.status === 201) {
          alert("Đăng ký thành công!");
          navigate("/login");
        }
      } else {
        alert("Mật khẩu nhập lại không trùng khớp!");
      }
    }
  };
  return (
    <div className="container-register-page">
      <h1 className="register-name">Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>
            Username <strong className="red">*</strong>
          </label>
        </div>
        <div className="row">
          <input
            type="text"
            name="username"
            placeholder="Nhập username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.username && !isValid && errors.username && (
          <p className="red">{errors.username}</p>
        )}

        <div className="row">
          <label>Name</label>
        </div>
        <div className="row">
          <input type="text" name="name" placeholder="Nhập name" />
        </div>

        <div className="row">
          <label>
            Email <strong className="red">*</strong>
          </label>
        </div>
        <div className="row">
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.email && !isValid && errors.email && (
          <p className="red">{errors.email}</p>
        )}

        <div className="row">
          <label>
            Phone number <strong className="red">*</strong>
          </label>
        </div>
        <div className="row">
          <input
            type="text"
            name="phone"
            placeholder="Nhập phone number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.phone && !isValid && errors.phone && (
          <p className="red">{errors.phone}</p>
        )}

        <div className="row">
          <label>
            Password <strong className="red">*</strong>
          </label>
        </div>
        <div className="row">
          <input
            type="password"
            name="password"
            placeholder="Nhập password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.password && !isValid && errors.password && (
          <p className="red">{errors.password}</p>
        )}

        <div className="row">
          <label>
            Confirm Password <strong className="red">*</strong>
          </label>
        </div>
        <div className="row">
          <input
            type="password"
            name="cfPassword"
            placeholder="Nhập lại password"
            value={values.cfPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched.cfPassword && !isValid && errors.cfPassword && (
          <p className="red">{errors.cfPassword}</p>
        )}

        <br />

        <div className="input-form">
          <button type="submit">Đăng ký</button>
          <p>
            Bạn đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
