import { styles, modalStyle } from "../assets/dialogStyles.ts";
import Modal from 'react-modal';
import { useRef, useState } from "react";
import GoogleMapsComponent from "./GoogleMap";
import { useCookies } from "react-cookie";

//setting props
type Props = {
    isDialogOpen: boolean;
    closeDialog: () => void;
    userEmail: string;
    coordinates?: { lat: number, lon: number };
}

Modal.setAppElement('#root');
export const AddLocationDialog = ({ isDialogOpen, closeDialog, userEmail }: Props) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [cookies] = useCookies(['email', 'accessToken', 'folder_id']);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //TODO add editing feature
    const [file, setFile] = useState({
        email: userEmail,
        title: "",
        description: "",
        lat: null,
        lon: null,
        date: new Date(),
        folder_id: cookies.folder_id
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFile((prevFile) => ({
            ...prevFile,
            [name]: value,
        }));
    };

    const handleLocationData = (latLon: { lat: any, lon: any }) => {
        setFile((prevFile) => ({
            ...prevFile,
            lat: latLon.lat,
            lon: latLon.lon,
        }));

    }

    //selecting image
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setSelectedImage(selectedFile);
        }
    };

    //uploading new file
    const handleAddFile = async () => {
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            formData.append('email', file.email);
            formData.append('title', file.title);
            formData.append('description', file.description);
            formData.append('lat', file.lat!);
            formData.append('lon', file.lon!);
            formData.append('date', file.date.toString());
            formData.append('folder_id', file.folder_id);

            await fetch(`${serverUrl}/files`, {
                method: 'POST',
                body: formData,
            });

        } catch (error) {
            console.log(error);
        }
    };
    // cascading two methods
    const handleAddButton = () => {
        handleAddFile();
        closeDialog();
    };

    return (
        <div>
            <Modal isOpen={isDialogOpen} style={modalStyle}>

                <div style={{ width: "100%", padding: "30px" }} >
                    <button
                        style={{ ...styles.buttonStyle, ...styles.selectImageStyle }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Select Image
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageSelect(e)}
                    />
                    <p style={styles.titleStyle}>
                        Enter Name: <input type="text" style={styles.inputStyle} name="title" value={file.title} onChange={handleInputChange} />
                    </p>
                    <p style={styles.titleStyle}>
                        Enter Description: <textarea style={{ ...styles.inputStyle, height: "150px", resize: "none" }} name="description" value={file.description} onChange={handleInputChange} />
                    </p>
                    {!isDialogOpen ? null : <GoogleMapsComponent mapContainerStyle={{ width: 600, height: 400 }} apiKey={apiKey} isDialogOpen={isDialogOpen} onLocationDataChange={handleLocationData} />}
                    <div style={{ ...styles.userActionButtons }}>
                        <button style={{ ...styles.buttonStyle, backgroundColor: "#d11a2a" }} onClick={closeDialog}>Close</button>

                        <button style={styles.buttonStyle} onClick={handleAddButton}>Add</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}