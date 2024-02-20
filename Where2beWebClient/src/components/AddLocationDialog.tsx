import { styles, modalStyle } from "../assets/dialogStyles.ts";
import Modal from 'react-modal';
import { useState } from "react";
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
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken', 'folder_id']);

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
        console.log(latLon);
        setFile((prevFile) => ({
            ...prevFile,
            lat: latLon.lat,
            lon: latLon.lon,
        }));
        
    }

    //selecting image
    const handleSelectImage = () => {
        //TODO: add image selection functionality
    };

    //uploading new file
    const handleAddFile = async () => {
        try {
            const response: Response = await fetch(`${serverUrl}/files`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(file),
            });
            console.log(response);
            
        } catch (error) {
            console.log(error);
        }
    };
    // cascading two methods
    const handleAddButton=()=>{
        handleAddFile();
        closeDialog();
    };

    return (
        <div>
            <Modal isOpen={isDialogOpen} style={modalStyle}>

                <div style={{ width: "100%", padding: "30px" }} >
                    {/* add select image button functionality */}
                    <button style={{ ...styles.buttonStyle, ...styles.selectImageStyle }} onClick={handleSelectImage}>Select Image</button>
                    <p style={styles.titleStyle}>
                        Enter Name: <input type="text" style={styles.inputStyle} name="title" value={file.title} onChange={handleInputChange} />
                    </p>
                    <p style={styles.titleStyle}>
                        Enter Description: <textarea style={{ ...styles.inputStyle, height: "150px", resize: "none" }} name="description" value={file.description} onChange={handleInputChange} />
                    </p>
                    {!isDialogOpen ? null :<GoogleMapsComponent apiKey={apiKey} isDialogOpen={isDialogOpen} onLocationDataChange={handleLocationData} />}

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