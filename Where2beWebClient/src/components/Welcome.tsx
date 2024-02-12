import { useState } from 'react';
import { styles } from '../assets/welcomeStyles';
import backgroundImage from '../assets/Bg.png';
import logoImage from '../assets/Logo.png';

export const Welcome = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpClick, setSignUpClick] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');

    const handleLogin = () => {
        setSignUpClick(false);
        if (email!="" && password!="") {
            /* compare login info to see if exists */
            
        }
        console.log('Login clicked');
    };

    const handleSignUp = () => {
        setSignUpClick(true);
        if (email!="" && password==passwordCheck && signUpClick==true) {
            /* send signup info to database */
            
            
        }
        console.log('Sign Up clicked');
    };

    const handleSignInWithGoogle = () => {
        /* later handle google signin and signup */
        console.log('Sign In with Google clicked');
    };

    return (
        <div style={{ ...styles.content, backgroundImage: `url(${backgroundImage})` }}>
            <img src={logoImage} alt="Where2be Logo" style={{ marginBottom: 27 }} />

            <div style={styles.textField}>
                <input style={styles.textInput} placeholder="e-mail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div style={styles.textField}>
                <input style={styles.textInput} placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {signUpClick &&
                <div style={styles.textField}>
                    <input style={styles.textInput} placeholder="re-enter password"
                        type="password"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </div>}
            <div style={{ ...styles.buttonField, marginTop: 20 }}>
                <button style={styles.buttons} onClick={handleLogin}>Login</button>
                <button style={styles.buttons} onClick={handleSignUp}>Sign Up</button>
                <button style={styles.buttons} onClick={handleSignInWithGoogle}>Sign In with Google</button>
            </div>
        </div>
    );
};

