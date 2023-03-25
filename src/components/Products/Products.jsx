import React, { useState, useEffect, useContext } from "react";
import { BACKEND_DOMAIN_API } from "../../global/Backend-api";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../App.js";
import { dictionary } from "../../language/language.js";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componenetMouted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`${BACKEND_DOMAIN_API}/api/v1/products`);
      if (componenetMouted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componenetMouted = false;
      };
    };
    getProducts();
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
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5  pb-5">
          <button
            className="btn btn-light me-2"
            onClick={() => setFilter(data)}
          >
            {dictionary[crrThemeContext.language]["CATE_1"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("Dedicated PC")}
          >
            {dictionary[crrThemeContext.language]["CATE_2"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("Office PC")}
          >
            {dictionary[crrThemeContext.language]["CATE_3"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("CPU")}
          >
            {dictionary[crrThemeContext.language]["CATE_4"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("Mainboard")}
          >
            {dictionary[crrThemeContext.language]["CATE_5"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("VGA")}
          >
            {dictionary[crrThemeContext.language]["CATE_6"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("RAM")}
          >
            {dictionary[crrThemeContext.language]["CATE_7"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("SSD")}
          >
            {dictionary[crrThemeContext.language]["CATE_8"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("PSU")}
          >
            {dictionary[crrThemeContext.language]["CATE_9"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("Screen")}
          >
            {dictionary[crrThemeContext.language]["CATE_10"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("Mouse Keys")}
          >
            {dictionary[crrThemeContext.language]["CATE_11"]}
          </button>
          <button
            className="btn btn-light me-2"
            onClick={() => filterProduct("Case")}
          >
            {dictionary[crrThemeContext.language]["CATE_12"]}
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      {dictionary[crrThemeContext.language]["BUY_N"]}
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">
            {dictionary[crrThemeContext.language]["T_H1"]}
          </h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
