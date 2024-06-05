import { useState } from 'react';
import logo from '../pics/logo.png';
import picture from '../pics/picture.png';

import { myAuth, myStorage, myDB } from "../firebase";     // From the firebase.js file

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";   // From firebase SDK
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {

    const [err, setErr] = useState(false);
    const myNavigate = useNavigate();

    const regEmail = async (regEmailEvent) => {
        
        regEmailEvent.preventDefault();
        const username = regEmailEvent.target[0].value;
        const email = regEmailEvent.target[1].value;
        const password = regEmailEvent.target[2].value;
        const avatar = regEmailEvent.target[3].files[0];

        
        try{
            const res = await createUserWithEmailAndPassword(myAuth, email, password);

            const storageRef = ref(myStorage, username);
            
            const uploadTask = uploadBytesResumable(storageRef, avatar);
            
            uploadTask.then( async()=> {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            username,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(myDB, "users", res.user.uid), {
                            uid: res.user.uid,
                            username,
                            email,
                            photoURL: downloadURL
                        });

                        myNavigate("/");
                    
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                    }
                });
            });
        } catch(err){
            console.log(err);
            setErr(true);
        }
    };

    return (
        <div className="formPage">
            <div className="formBox">
                <img id='logo' src={logo} alt=""/>
                <span id="regText">Register</span>

                <form onSubmit={regEmail}>
                    <input
                        required type="text" 
                        placeholder='username'
                        id = 'receiverName'
                    />
                    <input
                        required type="email"
                        placeholder='email'
                        id = 'receiverEmail'
                    />
                    <input
                        required type="password"
                        placeholder='password'
                    />
                    <input id="DP"
                        required type='file'
                    />
                    <label htmlFor='DP'>
                        <img src={picture} alt=""/>
                        <span>Add an Avatar</span>
                    </label>

                    <button>Sign Up</button>
                    {err && <span style={{color:'red', margin:'auto'}}>Something went wrong</span>}

                </form>

                <span id='loginText'>Already a user? <Link to="/login">Login</Link> </span>
            </div>
        </div>
    );
}

export default Register;