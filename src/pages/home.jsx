import { useContext } from 'react'
import { myAuth } from "../firebase";     // From the firebase.js file
import { signOut } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import logout from "../pics/logout.png";

export default function Home() {
    const { curUser } = useContext(AuthContext);

    return (
        <div className='home'>
        <div className='margins'>User Info</div>
            {curUser ? (
                <div className="user-card">
                    <div className="avatar-container">
                        <img className="user-avatar" src={curUser.photoURL} alt="User Avatar" />
                    </div>
                    <div className="user-details">
                        <span className="user-username">E-mail: {curUser.username}</span>
                        <span className="user-email">{curUser.email}</span>
                    </div>
                </div>
            ) : (
                <div className="not-signed-in">
                    Not Signed In
                </div>
            )}
            <button onClick={() => signOut(myAuth)} className="logout-button">
                <Link id='logoutLink' to="/login">Logout</Link>
                <img className="logout-icon" src={logout} alt="Logout Icon" />
            </button>
        </div>
    );
}