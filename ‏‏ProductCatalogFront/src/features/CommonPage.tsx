import Input from '../components/Input';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { HttpStatus, TextColor } from '../helpers/enums';
import { useNavigate } from 'react-router-dom';
import { routes } from '../helpers/consts';
import { useSignupMutation, useLoginMutation } from '../api/users';
import { setToken, setUser } from '../helpers/helpers';
import Link from '../components/Link';
import Loader from '../components/Loader';
import Text from '../components/Text';
import Label from '../components/Label';

// Component that displays the Register/Login page according to the current url
const CommonPage = () => {

    const [isRegister, setIsRegister] = useState<boolean>();

    useEffect(() => {
        const currPage: string = window.location.pathname.split('/')[1];
        setIsRegister(currPage === "register")
    }, []);
    
    
    const [username, setUsername] = useState<string>("");
    const [usernameErr, setUsernameErr] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    const [modalFlag, setModalFlag] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>("");
    const navigate = useNavigate();

    const [signup, {isLoading: isSignupLoading}] = useSignupMutation();
    const [login, {isLoading: isLoginLoading}] = useLoginMutation();


    // function that handles the submit of the register/login form
    const handleSubmit = async () => {
        let flag: boolean = true;

        if(username.trim() === "")
        {
            flag = false;
            setUsernameErr(true);
        }
        if(password.trim() === "")
        {
            flag = false;
            setPasswordErr(true);
        }

        if(flag)
        {
            try
            {
                let res;
                if(isRegister)
                    res = await signup({username, password}).unwrap();
                else
                    res = await login({username, password}).unwrap();
                setToken(res.token);
                setUser(username);
                setModalText(res.message);
            }
            catch(error: any)
            {                
                if(error.status == HttpStatus.InternalServerError 
                    || error.status == HttpStatus.PageNotFound 
                    || error.status == HttpStatus.FetchError 
                )
                    navigate(routes.errorPage);
                else
                    setModalText(error?.data?.error);            
            }
            setModalFlag(true);
        }
    }

    const clearPage = () => {
        setUsername("");
        setPassword("");
        setUsernameErr(false);
        setPasswordErr(false);
    }
    

    return (
        <div className="common-page">
            <Text text={`${isRegister ? "Register" : "Login"} Page`} textColor={TextColor.White} className='title'/>
            <form className="form-area" onSubmit={(event) => {handleSubmit(); event.preventDefault();}}>
                <div className="input-label-area">
                    <div className="input-label">
                        <Label text={"username: "} htmlFor={"username"}/>
                        <Input text={username} handleChange={(username: string) => {setUsername(username); setUsernameErr(false);}} error={usernameErr} id={"username"}/>
                    </div>
                    <div className="input-label">
                        <Label text={"password: "} htmlFor={"password"}/>
                        <Input text={password} handleChange={(username: string) => {setPassword(username); setPasswordErr(false);}} error={passwordErr} id={"password"}/>
                    </div>
                </div>
                <Button text={`${isRegister ? "Register" : "Login"}`} handleClick={()=>{}}/>
                <Text text={"Enter a valid username and password (not empty or just spaces)"} textColor={TextColor.White} className='label'/>
                <Link text={isRegister ? "already have a user?" : "don't have a user?"} route={isRegister ? routes.loginPage : routes.registerPage} handleClick={clearPage}/>
                <div className="error-container">
                    {usernameErr && <Text text={"You must fill in the username field"} textColor={TextColor.Error} className="error-text"/>}
                    {passwordErr && <Text text={"You must fill in the password field"} textColor={TextColor.Error} className="error-text"/>}
                </div>
            </form>
            <Modal 
                modalFlag={modalFlag} 
                handleClose={()=>{setModalFlag(!modalFlag);}} 
                handleOk={() => {
                    modalText === `You have been ${isRegister ? "registered" : "logged in"} successfully :)` && navigate(routes.productsPage); 
                    setModalFlag(!modalFlag);
                }} 
                showOk={false}
            >
                <Text text={modalText} textColor={TextColor.Teal} className='label'/>
            </Modal>
            {(isSignupLoading || isLoginLoading) && <Loader/>}
        </div>
        )
};


export default CommonPage;