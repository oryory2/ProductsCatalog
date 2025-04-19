import { ButtonsLayout } from "../helpers/enums";

type Props = {
    children: React.ReactNode;
    buttonsLayout: ButtonsLayout;
    className?: string;
};

// Component that contains and laysout button components
const ButtonsContainer = ({children, buttonsLayout, className}: Props) => {
    return(
        <div className={`buttons-container ${buttonsLayout} ${className}`}>
            {children}
        </div>
    )
};


export default ButtonsContainer;