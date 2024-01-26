import React, { Fragment, useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
//product fetch kr rhy hn(part 1) return se phly tak
import { useDispatch, useSelector } from "react-redux";
//action wala function h jo fetch kr rhy hn
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
//cart import
import { addItemsToCart } from "../../actions/cartAction.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";
// import { useNavigate } from "react-router-dom";

let ProductDetails = () => {
  // const { isAuthenticated } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  //fetch part 2
  const dispatch = useDispatch();
  //is k thro ay ga
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  let { success, error: reviewError } = useSelector((state) => state.newReview);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increasequantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreasequantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };

  const addToCartHandler = () => {
    // if (isAuthenticated) {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart Successfully");
    // } else {
    //   navigate("/login");
    //   alert.error("No Item Added To Cart, First login");
    // }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  let options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div id="peroductDetailshbhai">
            <div>
              {/* <Carousel> */}

              {product.images &&
                product.images.map((item, i) => (
                  <img
                    id="CaerouselImagehbhai"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}

              {/* </Carousel> */}
            </div>

            <div>
              <div className="deetailsBloack-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="deetailsBloack-2">
                <Rating {...options} />
                <span className="deetailsBloack-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="deetailsBloack-3">
                <h1>{`Rs.${product.price}`}</h1>
                <div className="deetailsBloack-3-1">
                  <div className="deetailsBloack-3-1-1">
                    <button onClick={decreasequantity}>-</button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increasequantity}>+</button>
                  </div>

                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="deetailsBloack-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReviewbtn">
                {" "}
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviewss">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviewss">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
