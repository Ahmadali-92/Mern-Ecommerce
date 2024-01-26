import React from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
import logo from "../../../images/logo.png";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = props;
  return (
    <>
      <div className="nav-Stick">
        <nav className="nav-Stick navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="e-Logo-Txt navbar-brand" to="/">
              <img id="eCommerceLogo" src={logo} alt="E-Commerce" />
              <span id="eCommercetxt">e-Commerce</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-Bar nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-Bar nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-Bar nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-Bar nav-link" to="/content">
                    Content
                  </Link>
                </li>
              </ul>
              <div id="navBar-Icons" className="text-style-none">
                <Link to="/search">
                  <div className="s1">
                    <IoSearch />
                  </div>
                </Link>
                <Link to="/cart">
                  <div className="c2">
                    {!cartItems.length == 0 ? (
                      <div className="position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      </div>
                    ) : null}
                    <LuShoppingBag />
                  </div>
                </Link>

                <Link to="/login">
                  {!isAuthenticated && (
                    <div className="p3">
                      <CgProfile />
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
