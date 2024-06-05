import { useState } from 'react';
import logo from '../pics/logo.png';
import { signInWithEmailAndPassword } from "firebase/auth";   // From firebase SDK
import { myAuth } from "../firebase";     // From the firebase.js file
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    
    console.log(myAuth?.currentUser);
    
    const loginEmail = async (loginEmailEvent) => {
        loginEmailEvent.preventDefault();
        const email = loginEmailEvent.target[0].value;
        const password = loginEmailEvent.target[1].value;
        try{
            await signInWithEmailAndPassword(myAuth, email, password);
            navigate("/");
        }catch(err){
            console.error(err);
            setErr(true);
        }
    };

    return (
        <div className="formPage">
            <div className="formBox">
                <img id='logo' src={logo} alt=""/>
                <span id="regText">Login</span>

                <form onSubmit={loginEmail}>
                    <input
                        required type="email"
                        placeholder='email'
                    />
                    <input
                        required type="password"
                        placeholder='password'
                    />
                    
                    <button>Login</button>
                    {err && <span style={{color:'red', margin:'auto'}}>User Not Found</span>}
                </form>

                <span id='loginText'>Don&apos;t have an account? <Link to="/register">Register</Link> </span>
            </div>
        </div>
    );
}

export default Login;