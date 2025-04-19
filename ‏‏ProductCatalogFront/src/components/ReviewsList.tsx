import { TextColor } from "../helpers/enums";
import type { Product, Review as ReviewType} from "../helpers/types"
import Review from "./Review";
import Text from "./Text";


type Props = {
    product: Product;
    handleUpdate: (review: Review) => void;
    handleDelete: (reviewId: string) => void;
};


// Component that displays all the reviews of a specific product
const ReviewsList = ({product, handleUpdate, handleDelete}: Props) => {
    
    return (
        <div className="reviews-container">
            {product?.reviews.length !== 0 && <>
                <Text text={"Reviews"} textColor={TextColor.Teal} className="label"/>
                {product?.reviews.map((review: ReviewType, index: number) => (
                    <Review key={review._id} review={review} reviewNumber={index + 1} handleUpdate={handleUpdate} handleDelete={handleDelete}/>))}
            </>}
        </div>
    )
};


export default ReviewsList;