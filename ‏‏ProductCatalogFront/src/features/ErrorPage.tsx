import Link from "../components/Link";
import Text from "../components/Text";
import { routes } from "../helpers/consts";
import { TextColor } from "../helpers/enums";


// Component that displays an error page
const ErrorPage = () => {
    return(
        <div className="common-page">
            <Text text={"Error Page"} textColor={TextColor.White} className="title"/>
            <Text text={"Oops! Something went wrong"} textColor={TextColor.White} className="label"/>
            <Link text={"Go back to Login page.."} route={routes.loginPage}/>
        </div>
    )
}


export default ErrorPage;