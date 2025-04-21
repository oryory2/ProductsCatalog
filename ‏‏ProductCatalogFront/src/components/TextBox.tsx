
type Props = {
    text: string;
    handleChange: (text: string) => void;
    className: string;
    error: boolean;
    id: string;
};

// Component that displays a text box
const TextBox = ({text, handleChange, className, error, id}: Props) => {
    return(
        <textarea
            value={text}
            onChange={(event)=>{handleChange(event.target.value);}}
            className={`${className} ${error && "error"}`}
            rows={10}
            id={id}
        />
    )
};


export default TextBox;