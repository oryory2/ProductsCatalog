import { useNavigate } from "react-router-dom";

type Props = {
    text: string;
    route: string;
    handleClick?: () => void
};

// Component that displays a link
const Link = ({text, route, handleClick}: Props) => {    

    const navigate = useNavigate();
    return(
        <a className="link" onClick={() => {navigate(route); handleClick && handleClick();}}>{text}</a>
    )
};


export default Link;