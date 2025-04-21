type Props = {
    text: string;
    htmlFor: string;
};



const Label = ({text, htmlFor}: Props) => {
    return(
        <label className="label-form" htmlFor={htmlFor}>{text}</label>
    )
};


export default Label;