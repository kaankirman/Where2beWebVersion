import { styles, profileModalStyle } from "../assets/dialogStyles.ts";
import Modal from 'react-modal';
import { useRef, useState } from "react";
import imagePlaceholder from '../assets/media/imagePlaceholder.jpg';
import { useCookies } from "react-cookie";
import { profileDialogStyles } from "../assets/dialogStyles.ts";

// setting props
type Props = {
    isDialogOpen: boolean;
    closeDialog: () => void;
    userEmail: string;
};

Modal.setAppElement('#root');
export const ProfileDialog = ({ isDialogOpen, closeDialog, userEmail }: Props) => {
    const [imageSelected, setImageSelected] = useState(false);
    const [cookies, setCookie,] = useCookies(['email', 'accessToken', 'url']);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setSelectedImage(selectedFile);
            setImageSelected(true);
        }
    };

    const serverUrl = import.meta.env.VITE_BASE_URL;
    const handleAddImage = async () => {
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            const response: Response = await fetch(`${serverUrl}/users/${cookies.email}`, {
                method: 'PATCH',
                body: formData,
            });
            const data = await response.json();
            setCookie("url", data.fileUrl);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveButton = () => {
        handleAddImage();
        closeDialog();
        setImageSelected(false);
    };

    return (
        <div>
            <Modal isOpen={isDialogOpen} style={profileModalStyle}>
                <div style={profileDialogStyles.mainContainer}>
                    {!selectedImage ? (<img style={profileDialogStyles.profileImage} onClick={() => fileInputRef.current?.click()} src={cookies.url || imagePlaceholder} alt="" />) : null}
                    {selectedImage ? (<img style={profileDialogStyles.profileImage} onClick={() => fileInputRef.current?.click()} src={URL.createObjectURL(selectedImage)} alt="" />) : null}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageSelect(e)}
                    />
                    <input
                        type="text"
                        value={userEmail}
                        readOnly
                        style={profileDialogStyles.textInputStyle}
                    />
                    <div style={{ ...styles.userActionButtons, alignSelf: "flex-end" }}>
                        {/* add add button functionality */}
                        <button style={{ ...styles.buttonStyle, backgroundColor: "#d11a2a" }} onClick={closeDialog}>
                            Close
                        </button>
                        {imageSelected ? (<button style={styles.buttonStyle} onClick={handleSaveButton} >Save</button>) : null}
                    </div>
                </div>
            </Modal>
        </div>
    );
};
