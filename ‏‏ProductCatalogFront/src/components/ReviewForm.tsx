import { useImperativeHandle, useState } from "react";
import { TextColor } from "../helpers/enums";
import { getUsername } from "../helpers/helpers";
import Input from "./Input";
import Text from "./Text";
import TextBox from "./TextBox";
import Stars from "./Stars";



type Props = {
    formRef: any;
    initDescription?: string;
    initRating?: number;
};

// Component that displays a review form for adding/updating a review for a specific product
const ReviewForm = ({formRef, initDescription, initRating}: Props) => {
    const username = getUsername();
    const [description, setDescription] = useState<string>(initDescription || "");
    const [descriptionErr, setDescriptionErr] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(initRating || 0);
    const [ratingErr, setRatingErr] = useState<boolean>(false);


    // function that handles the validation of the review form
    const getReviewDetails = () => {
        let flag: boolean = true;

        if(description.trim() === "")
        {
            flag = false;
            setDescriptionErr(true);
        }
        if(rating === 0)
        {            
            flag = false;
            setRatingErr(true);
        }
        return flag
        ? {username: username, rating: rating, description: description}
        : null
    }

    // using useImperativeHandle to expose a prop through a useRef
    useImperativeHandle(formRef, () => ({
        getReviewDetails,
    }));

    return(
        <div className="review-form">
                <div className="input-label">
                    <Text text={"username: "} textColor={TextColor.White} className='label'/>
                    <Input text={username} isDisabled={true}/>
                </div>

                <div className="input-label">
                    <Text text={"description: "} textColor={TextColor.White} className='label'/>
                    <TextBox 
                    text={description} 
                    handleChange={(text: string)=>{setDescription(text); setDescriptionErr(false);}} 
                    className={"text-box"} 
                    error={descriptionErr}/>
                </div> 

                <div className="input-label">
                    <Text text={"rating: "} textColor={TextColor.White} className='label'/>
                    <div className="dynamic-stars-container">
                        <Stars rating={rating} handleChange={(rating: number) => {setRating(rating); setRatingErr(false);}} error={ratingErr}/>
                    </div>
                </div>
                <div className="error-container">
                    {descriptionErr && <Text text={"You must fill in the description field"} textColor={TextColor.Error} className="error-text"/>}
                    {ratingErr && <Text text={"You must pick a rating"} textColor={TextColor.Error} className="error-text"/>}
                </div>
        </div>
    )
};



export default ReviewForm;