import { useCookies } from 'react-cookie';

function FolderItem({ folder }: { folder: any }) {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);
    const isSelectedFolder = folder.folder_id === cookies.folder_id;

    const onFolderClick = () => {
        console.log(folder);
        setCookie("folder_id", folder.folder_id);
        removeCookie("title");
        removeCookie("description");
        removeCookie("lat");
        removeCookie("lng");
    }

    return (
        <li className="nav-item">
            <a
                id={folder.folder_id}
                href="#"
                className={`nav-link ${isSelectedFolder ? 'active' : 'text-white'}`}
                aria-current="page"
                onClick={onFolderClick}
            >
                {folder.folder_name}
            </a>
        </li>
    );
}

export default FolderItem;