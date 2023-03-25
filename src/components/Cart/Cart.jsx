import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { delCart } from "../../redux/action";
import handleCart from "../../redux/reducers/handleCart";
import { addCart } from "../../redux/action";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../App.js";
import { dictionary } from "../../language/language.js";

const Cart = () => {
  const crrThemeContext = useContext(ThemeContext);

  useEffect(() => {
    const crrTheme = localStorage.getItem("theme");
    if (crrTheme) {
      crrThemeContext.setThemeValue(crrTheme);
    } else {
      localStorage.setItem("theme", crrThemeContext.themeValue);
    }
  }, []);

  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const delProduct = (product) => {
    dispatch(delCart(product));
  };

  const product = (product) => {
    return (
      <div className="px-4 my-5 rounded-3" key={product.id}>
        <div className="container py-4">
          <div className="row">
            <div className="col-md-2 bg-white me-5">
              <img
                src={product.image}
                alt={product.title}
                height="80%"
                width="80%"
              />
            </div>
            <div className="col-md-6 ">
              <h6 className="display-6 fw-bold">{product.title}</h6>
              <p className="lead">
                {product.qty} x ${product.price} = ${" "}
                {product.qty * product.price}
              </p>
              <button
                className="btn btn-outline-dark me-4"
                onClick={() => delProduct(product)}
              >
                <i className="fa fa-minus"></i>
              </button>
              <button
                className="btn btn-outline-dark me-4"
                onClick={() => addProduct(product)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <h3 className="text-center">
              {dictionary[crrThemeContext.language]["CART_1"]}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const button = () => {
    return (
      <div className="container">
        <div className="row">
          <NavLink to="/checkout" className="btn btn-dark mb-5 w-25 mx-auto">
            {dictionary[crrThemeContext.language]["ORDER_2"]}
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(product)}
      {state.length !== 0 && button()}
    </>
  );
};

export default Cart;
