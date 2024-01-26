import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSucces.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <>
      <div className="orderSuccess">
        <CheckCircleIcon />

        <Typography>Your Order Has Been Placed</Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </>
  );
};

export default OrderSuccess;
