type Props = {
    text: string;
    handleClick: () => void;
};

// Component that displays a button
const Button = ({text, handleClick}: Props) => {
    return(
        <button className="button" onClick={handleClick}>
            {text}
        </button>
    )
};


export default Button;