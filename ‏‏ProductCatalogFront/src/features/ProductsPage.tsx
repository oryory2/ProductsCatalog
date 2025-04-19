import { useState } from "react";
import Button from "../components/Button";
import ButtonsContainer from "../components/ButtonsContainer";
import ProductsList from "../components/ProductsList";
import { ButtonsLayout, TextColor } from "../helpers/enums";
import { getToken, setToken } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { routes } from "../helpers/consts";
import Text from "../components/Text";

// Component that displays all available products
const ProductsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getToken() ? true : false);
    const navigate = useNavigate();
    
    return(
        <div className="common-page">
            <Text text={"Products Page"} textColor={TextColor.White} className="title"/>
            <div className="">
                <ButtonsContainer buttonsLayout={ButtonsLayout.Center}>
                    {!isLoggedIn && <Button text={"Login"} handleClick={()=>{navigate(routes.loginPage);}}/>}
                    {isLoggedIn && <Button text={"Logout"} handleClick={()=>{setToken(""); setIsLoggedIn(false);}}/>}
                </ButtonsContainer>
            </div>
            <ProductsList isLoggedIn={isLoggedIn}/>
        </div>
    )
};


export default ProductsPage;