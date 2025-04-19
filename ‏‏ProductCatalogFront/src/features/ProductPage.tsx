import { useLocation } from "react-router-dom";
import { Product, Review } from "../helpers/types";
import ProductTile from "../components/ProductTile";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../helpers/consts";
import ReviewsList from "../components/ReviewsList";
import Text from "../components/Text";
import { TextColor } from "../helpers/enums";
import Modal from "../components/Modal";
import { useRef, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import { useAddReviewMutation, useDeleteReviewMutation, useUpdateReviewMutation } from '../api/review';
import { useLazyGetProductQuery } from "../api/products";
import { getToken } from "../helpers/helpers";
import Loader from "../components/Loader";



// Component that displays all the details about one specific product
const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [getProduct, {isLoading: isLoadingGetProduct}] = useLazyGetProductQuery();
    const [addReview, {isLoading: isLoadingAddReview}] = useAddReviewMutation();
    const [updateReview, {isLoading: isLoadingUpdate}] = useUpdateReviewMutation();
    const [deleteReview, {isLoading: isLoadingDeleteReview}] = useDeleteReviewMutation();
    const [product, setProduct] = useState<Product>(location?.state?.product);
    const [reviewToUpdate, setReviewToUpdate] = useState<Review>();
    const [reviewIdToDelete, setReviewIdToDelete] = useState<string>();
    const [modalFlag, setModalFlag] = useState<boolean>(false);
    const [modalState, setModalState] = useState<string>("addReview");
    const formRef = useRef<any>(null);
    

    // function that handles the add review process
    const handleAddReview = async () => {
        const review = formRef.current?.getReviewDetails();
        if(review)
        {
            try
            {                
                await addReview({body: {...review, productName: product.productName}, token: getToken()}).unwrap();          
                const res = await getProduct(product._id).unwrap();                
                setProduct(res.product);
                setModalFlag(false);
            }
            catch
            {
                navigate(routes.errorPage);
            }
        }
    }

    // function that handles the update review process
    const handleUpdateReview = async () => {

        const review = formRef.current?.getReviewDetails();
        if(review)
        {
            try
            {
                await updateReview({reviewId: reviewToUpdate?._id, body: {...review, productName: product.productName}, token: getToken()}).unwrap();
                const res = await getProduct(product._id).unwrap();                
                setProduct(res.product);
                setModalFlag(false);
            }
            catch
            {
                navigate(routes.errorPage);
            }
        }
    }

    // function that handles the delete review process
    const handleDeleteReview = async () => {
        try
        {               
            await deleteReview({reviewId: reviewIdToDelete, token: getToken()}).unwrap();
            const res = await getProduct(product?._id).unwrap();                
            setProduct(res.product);
            setModalFlag(false);    
        }
        catch
        {
            navigate(routes.errorPage);
        }
    }

    return(
        <div className="common-page">
            <Text text={"Product Page"} textColor={TextColor.White} className="title"/>
            <Button text={"Back To Products"} handleClick={() => {navigate(routes.productsPage);}}/>
            <div className="product-page-tile">
                <ProductTile product={product}>
                    <ReviewsList product={product} 
                        handleUpdate={(review: Review)=>{setModalFlag(true); setModalState("updateReview"); setReviewToUpdate(review);}} 
                        handleDelete={(reviewId: string)=>{setModalFlag(true); setModalState("deleteReview"); setReviewIdToDelete(reviewId);}}
                    />
                    <Button text={"Add New Review"} handleClick={()=>{setModalState("addReview"); setModalFlag(true);}}/>
                </ProductTile>
            </div>
            <Modal 
                modalFlag={modalFlag} 
                handleOk={()=>{
                    if(modalState === "addReview")
                        handleAddReview();
                    else if(modalState === "updateReview")
                        handleUpdateReview();
                    else
                        handleDeleteReview();
                }} 
                handleClose={()=>{setModalFlag(false);}} 
                showOk={true}
            >
                {modalState === "addReview" 
                ? <ReviewForm formRef={formRef}/>
                : modalState === "updateReview"
                ? <ReviewForm formRef={formRef} initDescription={reviewToUpdate?.description} initRating={reviewToUpdate?.rating}/>
                : <Text text={"Are you sure you want to delete the review?"} textColor={TextColor.Teal} className='label'/>
                }
            </Modal>
            {(isLoadingAddReview || isLoadingGetProduct || isLoadingUpdate || isLoadingDeleteReview) && <Loader/>}
        </div>
    )
};


export default ProductPage;