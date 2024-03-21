import { csrfFetch } from "./csrf.js";

const READ_REVIEWS = "reviews/READ_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

export const viewReviews = (reviews) => ({
  type: READ_REVIEWS,
  reviews,
});
export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});
export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(viewReviews(spotId));
    return data;
  }
};

export const leaveReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application-json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(createReview(newReview));
    return newReview;
  }
};

export const deleteReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewId: review.id }),
  });
  if (response.ok) {
    dispatch(removeReview(review));
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_REVIEWS: {
      const newState = {};
      action.reviews.Reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case CREATE_REVIEW: {
      return { ...state, [action.review.id]: action.review };
    }
    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
