import { styles } from "../assets/homeStyles";
import profilePlaceholder from '../assets/profilePlaceholder.png'
import { useState } from "react";
import "../assets/fonts.css"
import { useCookies } from "react-cookie";

export const SideBar = ({ userEmail }: { userEmail: string }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken']);
    const [profileClick, setProfileClick] = useState(false);
    const handleProfileClick = () => {
        setProfileClick(!profileClick); // This will toggle the profileClick state between true and false
    };
    const handleSignOut = () => {
        removeCookie("email");
        removeCookie("accessToken");
        window.location.reload();
    };
    return (

        <div className="d-flex flex-column min-vh-100 p-3 text-bg-dark" style={{ width: "280px" }}>
            <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none">
                <h1 style={styles.logo}>Where2Be</h1>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {/* folder will be generated here */}
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        Folder 1
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link text-white " aria-current="page">
                        Folder 2
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={profilePlaceholder} alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{userEmail}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#">New Folder</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#" onClick={handleSignOut} >Sign out</a></li>
                </ul>
            </div>
        </div>
    )
}
