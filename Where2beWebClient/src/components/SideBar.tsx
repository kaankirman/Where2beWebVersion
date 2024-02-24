import { styles } from "../assets/homeStyles";
import profilePlaceholder from '../assets/profilePlaceholder.png'
import { useEffect, useState } from "react";
import "../assets/fonts.css"
import { useCookies } from "react-cookie";
import { AddFolderDialog } from "./AddFolderDialog";
import FolderItem from "./FolderItem";
import { ProfileDialog } from "./ProfileDialog";

export const SideBar = ({ userEmail }: { userEmail: string }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description', 'url']);
    const [folders, setFolders] = useState<any[]>([]);
    const serverUrl = import.meta.env.VITE_BASE_URL;


    const handleSignOut = () => {
        removeCookie("email");
        removeCookie("accessToken");
        removeCookie("folder_id");
        removeCookie("lat");
        removeCookie("lng");
        removeCookie("title");
        removeCookie("description");
        removeCookie("url");
        window.location.reload();
    };
    const [isFolderDialogOpen, setFolderDialogOpen] = useState(false)
    const openFolderDialog = () => {
        setFolderDialogOpen(true);
    };
    const closeFolderDialog = () => {
        setFolderDialogOpen(false);
    };
    
    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false)
    const openProfileDialog = () => {
        setProfileDialogOpen(true);
    };
    const closeProfileDialog = () => {
        setProfileDialogOpen(false);
    };
    const getData = async () => {
        try {
            const response = await fetch(`${serverUrl}/folders/${cookies.email}`);
            const data = await response.json();
            setFolders(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, []);



    console.log(folders);

    //sorting folder by date
    interface Folder {
        date: string;
    }
    const sortedFolders = folders?.sort((a: Folder, b: Folder) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
    });
    return (

        <div className="d-flex flex-column min-vh-100 p-3 text-bg-dark" style={{ width: "250px" }}>
            <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none">
                <h1 style={styles.logo}>Where2Be</h1>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                    {sortedFolders.map((folder) => <FolderItem key={folder.folder_id} folder={folder} />)}
            </ul>
            <AddFolderDialog userEmail={cookies.email} isDialogOpen={isFolderDialogOpen} closeDialog={closeFolderDialog} />
            <ProfileDialog userEmail={cookies.email} isDialogOpen={isProfileDialogOpen} closeDialog={closeProfileDialog}/>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={cookies.url} alt="" width="32" height="32" className="rounded-circle me-2" />
                    <span style={{ fontSize: "13px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{userEmail}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#" onClick={openFolderDialog}>New Folder</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={openProfileDialog} >Profile</a></li>
                    <li><a className="dropdown-item" href="#" onClick={handleSignOut} >Sign out</a></li>
                </ul>
            </div>
        </div>
    )
}
