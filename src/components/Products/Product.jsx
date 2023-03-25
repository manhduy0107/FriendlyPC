import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import Skeleton from "react-loading-skeleton";
import { BACKEND_DOMAIN_API } from "../../global/Backend-api";
import { ThemeContext } from "../../App.js";
import { dictionary } from "../../language/language.js";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_DOMAIN_API}/api/v1/products/${id}`
      );
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const crrThemeContext = useContext(ThemeContext);

  useEffect(() => {
    const crrTheme = localStorage.getItem("theme");
    if (crrTheme) {
      crrThemeContext.setThemeValue(crrTheme);
    } else {
      localStorage.setItem("theme", crrThemeContext.themeValue);
    }
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            {dictionary[crrThemeContext.language]["P_RATE"]}{" "}
            {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-warning px-4 py-2"
            onClick={() => addProduct(product)}
          >
            {dictionary[crrThemeContext.language]["P_ADD"]}
          </button>
          <NavLink to="/cart" className="btn btn-info ms-2 px-3 py-2">
            {dictionary[crrThemeContext.language]["P_GO"]}
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
