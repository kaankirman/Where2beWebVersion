import { useState } from 'react';
import { styles } from '../assets/welcomeStyles';
import backgroundImage from '../assets/Bg.png';
import logoImage from '../assets/Logo.png';
import { useCookies } from 'react-cookie';
import backgroundGif from '../assets/where2be_bg_vid.mp4';

export const Welcome = () => {
    const [, setCookie] = useCookies(['email', 'accessToken', 'url']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpClick, setSignUpClick] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const serverUrl = import.meta.env.VITE_BASE_URL;

    const handleLogin = async () => {
        setSignUpClick(false);
        if (email != "" && password != "") {
            const response = await fetch(`${serverUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();

            setCookie("email", data.email);
            setCookie("accessToken", data.accessToken);
            setCookie("url", data.url);
            window.location.reload();

        }
        console.log('Login clicked');
    };

    const handleSignUp = async () => {
        setSignUpClick(true);
        if (email != "" && password == passwordCheck && password !== "" && password !== null && signUpClick == true) {
            /* send signup info to database */
            const response = await fetch(`${serverUrl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();

            setCookie("email", data.email);
            setCookie("accessToken", data.accessToken);
            setCookie("url", data.url);
            window.location.reload();

        }
        console.log('Sign Up clicked');
    };

    return (
        <div style={{ ...styles.content}}>
            <video src={backgroundGif} autoPlay muted loop style={{ position: 'absolute', top: 0, left: 0, width: '100%',height:"100vh",objectFit:"cover", zIndex:-1 }}/>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "250px" }}>
                <h1 style={{ ...styles.logo }} onClick={() => window.location.reload()}>Where2be</h1>
                <div style={{...styles.textField}}>
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
                <div style={{ ...styles.buttonField }}>
                    {!signUpClick ? (<button style={styles.button} onClick={handleLogin}>Login</button>) : null}
                    {signUpClick ? (<button style={styles.button} onClick={handleSignUp}>Sign Up</button>) : null}
                    {!signUpClick ? (<div style={{alignSelf:"center"}}><p style={{marginLeft:"13px", color:"white", marginTop: "10px",fontSize:22 }}>
                        Don't have an account?{''}
                        <button style={{ color: '#F7DE32', background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleSignUp}>
                            Sign up
                        </button>
                    </p></div>) : null}
                </div>
            </div>
        </div>
    );
};

