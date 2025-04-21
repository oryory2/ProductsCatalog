import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../api/products";
import Loader from "./Loader";
import { Product } from "../helpers/types";
import ProductTile from "./ProductTile";
import { useNavigate } from "react-router-dom";
import { routes } from "../helpers/consts";
import Modal from "./Modal";
import Text from './Text';
import { TextColor } from "../helpers/enums";

type Props = {
    isLoggedIn: boolean;
};


// Component that fetches and displays all available products
const ProductsList = ({isLoggedIn}: Props) => {

    const [products, setProducts] = useState([]);
    const [modalFlag, setModalFlag] = useState<boolean>(false);
    const {data, isLoading, isError} = useGetAllProductsQuery("", {refetchOnMountOrArgChange: true});
    const navigate = useNavigate();
     

    useEffect(() => {
        if(isError)
            navigate(routes.errorPage)

        if(data)    
            setProducts(data.map((product: Product) => (
            <ProductTile
                key={product._id} 
                product={product} 
                isLoggedIn={isLoggedIn} 
                handleClick={() =>{isLoggedIn 
                    ? navigate(routes.productsPage + `${product.productName}`.replace(/\s+/g, '-'), {state: {product: product}})
                    : setModalFlag(true);
                }}
            />
            )))
    }, [data, isError, isLoggedIn]);


    return isLoading
    ? <Loader/>
    : products.length !== 0 
    ? <ul className="products-list">
        {products}
        <Modal modalFlag={modalFlag} handleOk={() => {setModalFlag(false); navigate(routes.loginPage);}} handleClose={() => {setModalFlag(false);}} showOk={true}>
            <Text text={"In order to view products, you must be logged in :("} textColor={TextColor.Teal} className="label"/>
        </Modal>
      </ul>
    : <Text text={"There are no products in the system.."} textColor={TextColor.White} className="label"/>


};


export default ProductsList;