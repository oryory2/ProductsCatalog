type Props = {
    text: string;
    handleChange?: (text: any) => void
    error?: boolean;
    isDisabled?: boolean;
};


// Component that displays an input box
const Input = ({text, handleChange, error, isDisabled = false}: Props) => {

    return(
        <input
            type="text"
            disabled={isDisabled}
            value={text}
            onChange={(event) => {handleChange && handleChange(event.target.value);}}
            className={`input ${error && "error"} ${isDisabled && "disabled"}`}
        />
    )

};



export default Input;