import React from "react";
// import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  
  let options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="reviewssCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <div>
          <Rating {...options} />
        </div>
        <span>{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
