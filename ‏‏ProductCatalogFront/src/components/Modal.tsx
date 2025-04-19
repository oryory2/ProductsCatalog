import { ButtonsLayout } from "../helpers/enums";
import Button from "./Button";
import ButtonsContainer from "./ButtonsContainer";

type Props = {
    children: React.ReactNode
    modalFlag: boolean;
    handleOk: () => void;
    handleClose: () => void;
    showOk: boolean;
};

// Component that displays a modal with provided content
const Modal = ({children, modalFlag, handleOk, handleClose, showOk}: Props) => {
    
    return modalFlag
    ?   <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-button" onClick={handleClose}>⨉</button>
                <div className="modal-content">
                    {children}
                </div>
                <ButtonsContainer buttonsLayout={ButtonsLayout.Center} className={"modal-buttons-container"}>
                    {showOk && <Button text="Ok" handleClick={()=>{handleOk();}}/>}
                    <Button text={showOk ? "Back" : "Close"} handleClick={showOk ? handleClose : handleOk}/>
                </ButtonsContainer>
            </div>
        </div>   
    : null
    
};


export default Modal;