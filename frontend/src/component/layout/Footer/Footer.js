import React from "react";
import Stores from "../../../images/Stores.png";
import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={Stores} alt="Logos" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyright 2023 &copy; by Ahmad</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <Link to="http://instagram.com">Instagram</Link>
        <Link to="http://facebook.com">Facebook</Link>
        <Link to="http://youtube.com">Youtube</Link>
      </div>
    </footer>
  );
};

export default Footer;
