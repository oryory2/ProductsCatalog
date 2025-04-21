import { TextColor } from "../helpers/enums";

type Props = {
    text: string;
    textColor: TextColor;
    className?: string;
};

// Component that displays a text (Title/Label/Tile-text)
const Text = ({text, textColor, className}: Props) => {
    return (
    <div className={`text ${className && className} ${textColor}`}>
        {text}
    </div>
)
};


export default Text;