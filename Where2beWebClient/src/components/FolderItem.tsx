import { useCookies } from 'react-cookie';

function FolderItem({ folder }: { folder: any }) {
    const [cookies, setCookie, ] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);
    const isSelectedFolder = folder.folder_id === cookies.folder_id;

    const onFolderClick = () => {
        setCookie("folder_id", folder.folder_id);
    }

    return (
        <li className="nav-item">
            <a  style={{backgroundColor:isSelectedFolder ? '#F7DE32' : ''}}
                id={folder.folder_id}
                href="#"
                className={`nav-link text-white`}
                aria-current="page"
                onClick={onFolderClick}
            >
                {folder.folder_name}
            </a>
        </li>
    );
}

export default FolderItem;