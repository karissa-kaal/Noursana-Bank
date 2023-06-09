import facerecg from "../resources/face-recg.svg"
import React from 'react';
import { makeApiRequest } from "../api/api";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [cnic, setCnic] = useState('');
    const [cardNo, setCardNo] = useState('');

    const navigate = useNavigate();

    const [showLoginFields, setShowLoginFields] = useState(false);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const verifySignup = async() => {
        const url = '/signupverify';
        const method = 'POST';
        console.log(name, cnic, cardNo);
        const body = { name, cnic, cardNo };
        console.log(body);
        try {
            const response = await makeApiRequest(url, method, body);
            console.log('Response:', response);
            setShowLoginFields(true);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }


    const verifyLogin = async() =>{
        const url = '/login';
        const method = 'POST';
        const body = { loginId, password, cnic};
        console.log(body);
        try {
            const response = await makeApiRequest(url, method, body);
            console.log('Response:', response);
            navigate('/welcome'); 
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const registerUser = async() => {
        const url = '/register';
        const method = 'POST';
        console.log(loginId, password, email, cnic, name, cardNo);
        const body = {loginId, password, email, cnic, name, cardNo};
        console.log(body);
        try {
            const response = await makeApiRequest(url, method, body);
            console.log('Response:', response);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    //function to note the current user
    const updateCurrentUser = async() => {
        const url = '/updateCurrentUser';
        const method = 'POST';
        const body = {loginId};
        console.log(body);
        try {
            const response = await makeApiRequest(url, method, body);
            console.log('Response:', response);
            navigate('/welcome');
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!showLoginFields)
        {
            try{
                await verifySignup();
                console.log('verify');
                setShowLoginFields(true);
            }
            catch(error){

            }
        }
        else{
            console.log('here');
            try{
                console.log('here');
                await registerUser();
                console.log('registered');
                await updateCurrentUser();
                console.log('current user updated')
                navigate('/welcome');
            }
            catch(error){
                    console.log(error);
            }
          
        }
    };
   
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
            try{
                await verifyLogin();
                console.log('user login verified')
                await updateCurrentUser();
                console.log('current user updated')
                
            }
            catch(error){
                console.log(error);
            }
    };

    const handleLoginClick = () => setIsLogin(false);
    const handleSignupClick = () => setIsLogin(true);

    return (
        <div className="container-lg">
            <div className="form-structor">
                <div className={`signup ${!isLogin ? 'slide-up' : ''}`}>
                    <h2 className="form-title" id="signup" onClick={handleSignupClick}>
                        Sign up
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-holder">
                 
                        {!showLoginFields && (
                        <>
                            <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" className="input" placeholder="CNIC" value={cnic} onChange={(e) => setCnic(e.target.value)} />
                            <input type="text" className="input" placeholder="Debit/Credit Card" value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
                        </>
                        )}
                        {showLoginFields && (
                        <>
                            <input type="text" className="input" placeholder="Log In ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                            <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" className="input" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                       
                        </>
                        )}
                        </div>
                        {showLoginFields && (
                            <div className="face-recog-svg">
                                <img src={facerecg} alt="face recognition" />
                            </div>
                        )}
                        <button type="submit" className="submit-btn" >{showLoginFields ? 'Sign up' : 'Next'}</button>
                    </form>

                </div>

                <div className={`login ${isLogin ? 'slide-up' : ''}`}>
                    <div className="center">
                        <h2 className="form-title" id="login" onClick={handleLoginClick}>
                        Log in
                        </h2>
                        <form onSubmit={handleLoginSubmit}>
                        <div className="form-holder">
                            <input type="login-id" className="input" placeholder="Login ID" onChange={(e)=>setLoginId(e.target.value)} />
                            <input type="password" className="input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="submit-btn">Log in</button>
                        <hr/>
                        <div className="face-recog-svg">
                            <img src={facerecg} alt="face recognition" />
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
    