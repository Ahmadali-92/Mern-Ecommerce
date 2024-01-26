import React from "react";
import "./CartItemsCard.css";
import { Link } from "react-router-dom";

const CartItemsCard = (props) => {
  const { item, deleteCartItem } = props;
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt={item.name} />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Rs:${item.price}`}</span>
          <p onClick={() => deleteCartItem(item.product)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemsCard;
