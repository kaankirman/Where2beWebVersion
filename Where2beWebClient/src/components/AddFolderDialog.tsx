import { styles, folderModalStyle } from "../assets/dialogStyles.ts";
import Modal from 'react-modal';
import { useState } from "react";

//setting props
type Props = {
    isDialogOpen: boolean;
    closeDialog: () => void;
    userEmail: string;
}

Modal.setAppElement('#root');
export const AddFolderDialog = ({ isDialogOpen, closeDialog, userEmail }: Props) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;

    //TODO add editing feature
    const [folder, setFolder] = useState({
        email: userEmail,
        folder_name: "",
        date: new Date(),
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFolder((prevFile) => ({
            ...prevFile,
            [name]: value,
        }));
    };

    //uploading new folder
    const handleAddFolder = async () => {
        try {
            await fetch(`${serverUrl}/folders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(folder),
            });
        } catch (error) {
            console.log(error);
        }
    };

    // cascading two methods
    const handleAddButton = () => {
        handleAddFolder();
        closeDialog();
    };

    return (
        <div>
            <Modal isOpen={isDialogOpen} style={folderModalStyle}>

                <div style={{ width: "100%", padding: "30px" }} >
                    <p style={styles.titleStyle}>
                        Enter Folder Name: <input type="text" style={styles.inputStyle} name="folder_name" value={folder.folder_name} onChange={handleInputChange} />
                    </p>
                    <div style={{ ...styles.userActionButtons }}>
                        {/* add add button functionality */}
                        <button style={{ ...styles.buttonStyle, backgroundColor: "#d11a2a" }} onClick={closeDialog}>Close</button>

                        <button style={styles.buttonStyle} onClick={handleAddButton}>Add</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}