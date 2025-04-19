
type Props = {
    text: string;
    handleChange: (text: string) => void;
    className: string;
    error: boolean;
};

// Component that displays a text box
const TextBox = ({text, handleChange, className, error}: Props) => {
    return(
        <textarea
        value={text}
        onChange={(event)=>{handleChange(event.target.value);}}
        className={`${className} ${error && "error"}`}
        rows={10}
        />
    )
};


export default TextBox;