import type { Review } from "../helpers/types"
import Text from "./Text";
import { ButtonsLayout, TextColor } from "../helpers/enums";
import Stars from "./Stars";
import ButtonsContainer from "./ButtonsContainer";
import { getUsername } from "../helpers/helpers";

type Props = {
    review: Review;
    reviewNumber: number;
    handleUpdate: (review: Review) => void;
    handleDelete: (reviewId: string) => void;
};


// Component that displays a review for a specific product
const Review = ({review, reviewNumber, handleUpdate, handleDelete}: Props) => {    
    return(
        <div className="review-container">
            <Text text={`(${reviewNumber.toString()})`} textColor={TextColor.Black} className="tile-text"/>
            <Text text={`username: ${review.username}`} textColor={TextColor.Teal} className="tile-text"/>
            <Text text={new Date(review.createdAt).toLocaleDateString("en-GB")} textColor={TextColor.Black} className="tile-text"/>
            <Text text={review.description} textColor={TextColor.Black} className="tile-text"/>
            <div className="review-stars">
                <Stars rating={review.rating}/>
            </div>
            {getUsername() === review?.username && 
                <ButtonsContainer buttonsLayout={ButtonsLayout.Center} className="review-buttons-container">
                    <button className="review-button" onClick={()=>{handleDelete(review._id)}}>🗑️</button>
                    <button className="review-button" onClick={()=>{handleUpdate(review);}}>✏️</button>
                </ButtonsContainer>}
        </div>
    )
};


export default Review;