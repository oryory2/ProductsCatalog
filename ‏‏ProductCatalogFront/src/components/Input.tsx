type Props = {
    text: string;
    handleChange?: (text: any) => void
    error?: boolean;
    isDisabled?: boolean;
    id: string;
};


// Component that displays an input box
const Input = ({text, handleChange, error, isDisabled = false, id}: Props) => {

    return(
        <input
            id={id}
            type="text"
            disabled={isDisabled}
            value={text}
            onChange={(event) => {handleChange && handleChange(event.target.value);}}
            className={`input ${error && "error"} ${isDisabled && "disabled"}`}
        />
    )

};



export default Input;