import { TextColor } from "../helpers/enums";
import { Product } from "../helpers/types"
import Stars from "./Stars";
import Text from "./Text";

type Props = {
    product: Product;
    isLoggedIn?: boolean;
    handleClick?: () => void;
    children?: React.ReactNode;
};


// Component that displays a product tile with its details
const ProductTile = ({product, isLoggedIn = true, handleClick, children}: Props) => {
    return(
        <li className={`product-tile ${!children && "hover"} ${!isLoggedIn && "blur"}`} onClick={handleClick}>
            <div className="product-tile-title">
                <Text text={product?.productName} textColor={TextColor.Teal} className="label"/>
            </div>
                <img src={product?.image} className="product-image"/>
            <Text text={`${product?.price}₪`} textColor={TextColor.Black} className="tile-text"/>
            <div className="stars-container-tile">
                <Stars rating={product?.rating}/>
                <Text text={`${product?.rating === 0 ? "" : `(${product?.rating.toString().substring(0, 5)})`}`} textColor={TextColor.Black} className="tile-text"/>
            </div>
            <Text text={`${product?.reviews?.length !== 0 ? product?.reviews?.length + " reviews" : "No Reviews"}`} textColor={TextColor.Black} className="tile-text"/>
            <div className="description-tile">
                <Text text={`${product?.description}`} textColor={TextColor.Black} className="tile-text"/>
            </div>
            {children}
        </li>
    )
};




export default ProductTile;