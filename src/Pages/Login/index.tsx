import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import AuthContainer from "../../Component/Layout/AuthContainer";
import ErrorText from "../../Component/Layout/ErrorText";
import { auth } from "../../Firebaselogin/firebase";
import logging from "../../Firebaselogin/logging";

const Login:FC = () =>{
    const [Logining, setLogining] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [comfirm, setComfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();
    
    const signUpWithEmailAndPassword = () =>{
        if(password !== comfirm) setError('hãy đảm bảo rằng mật khẩu của bạn phù hợp')
        if(error !== '' )setError('');
        setLogining(true);
        auth.createUserWithEmailAndPassword(email, password)
        .then(result =>{
            logging.info(result);
            navigate('/login')
        })
        .catch(error =>{
            logging.error(error);
            if(error.code.includes('auth/weak-password')){
                setError('Please enter a stronger password');
            }else if(error.code.includes('auth/email-already-in-use')){
                setError('Email already in use');
            }else{
                setError('Unable to Login. Please try again later.')
            }
            setLogining(false);
        })

    }
    return <AuthContainer header="Login">
        <FormGroup>
            <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email Address" 
                onChange={(event)=>{setEmail(event.target.value)}}
                value={email}
            />
        </FormGroup>
        <FormGroup>
            <Input 
                autoComplete="new-password"
                type="password" 
                name="password" 
                id="password" 
                placeholder="password Address" 
                onChange={(event)=>{setPassword(event.target.value)}}
                value={password}
            />
        </FormGroup>
        <FormGroup>
            <Input 
                autoComplete="new-password"
                type="password" 
                name="comfirm" 
                id="comfirm" 
                placeholder="comfirm Address" 
                onChange={(event)=>{setComfirm(event.target.value)}}
                value={comfirm}
            />
        </FormGroup>
        <Button
            disabled={Logining}
            color ="success"
            block
            onClick={() =>signUpWithEmailAndPassword()}
        >Sign up</Button>
        <small>
            <p className="m-1 text-center">Already have an account?<Link to="/login">Login</Link></p>
        </small>
        <ErrorText error={error} />
    </AuthContainer>
}

export default Login