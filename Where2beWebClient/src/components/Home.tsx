import { SideBar } from "./SideBar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/homeStyles.ts'
import addImage from '../assets/media/add.png';
import { useEffect, useState } from "react";
import { AddLocationDialog } from "./AddLocationDialog.tsx";
import LocationCard from "./LocationCard.tsx";
import { styles, responsive } from "../assets/homeStyles.ts";
import GoogleMapsComponent from "./GoogleMap.tsx";
import { useCookies } from "react-cookie";

//getting user data from database
export const Home = () => {
    const [cookies, setCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description', 'image_url']);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const email = cookies.email;
    const [files, setFiles] = useState<any[]>([]);

    //getting users files by their email
    const getData = async () => {
        try {
            const response = await fetch(`${serverUrl}/files/${email}`);
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    //sorting files by date
    interface File {
        folder_id: any;
        date: string;
    }
    const sortedFiles = files?.sort((a: File, b: File) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
    });
    const filteredAndSortedFiles = sortedFiles
        ?.filter((file: File) => file.folder_id === cookies.folder_id);


    //dialog state
    const [isDialogOpen, setDialogOpen] = useState(false)
    const openLocationDialog = () => {
        setDialogOpen(true);
    };
    const closeLocationDialog = () => {
        setDialogOpen(false);
    };
    const handleLoad = () => {
        if (!cookies.folder_id) {
            setCookie("folder_id", files[0].folder_id);
        }
    }

    return (
        <div onLoad={handleLoad} style={styles.flexRow}>
            <SideBar userEmail={cookies.email} />
            {cookies.folder_id ?
                (<div style={{ ...styles.flexColumn, marginLeft: "6vh", marginTop: "5vh", width: "85%" }}>
                    <div style={{ ...styles.flexRow, height: "auto" }}>
                        <div style={{ width: "80%" }}>
                            <Carousel className="carousel" responsive={responsive}>
                                {filteredAndSortedFiles.map((files) => <LocationCard key={files.file_id} files={files} />)}
                            </Carousel>
                        </div>
                        <div style={styles.addImageContainer}>
                            <img src={addImage} onClick={openLocationDialog} style={styles.addImage} alt="add image" />
                        </div>
                    </div>
                    <AddLocationDialog userEmail={email} isDialogOpen={isDialogOpen} closeDialog={closeLocationDialog} />
                    <div style={styles.fileContainer}>
                        <h1 style={{ marginTop: "1px" }}>
                            {cookies.title}
                        </h1>
                        <div style={styles.flexRow}>
                            {cookies.title ? (<div style={{ ...styles.flexColumn, marginRight: 20 }}>
                                <p style={{ width: "76vh", wordWrap: "break-word" }}>
                                    {cookies.description}
                                </p>
                                <div style={styles.fileImageContainer}>
                                    {cookies.title ? (<img style={styles.fileImage} src={cookies.image_url} alt="" />) : null}
                                </div>
                            </div>) : null}
                            <div style={styles.mapContainer}>
                                {isDialogOpen ? null : <GoogleMapsComponent apiKey={apiKey} mapContainerStyle={{ width: "85vh", height: "50vh" }} isDialogOpen={isDialogOpen} />}
                            </div>
                        </div>
                    </div>
                </div>) : null
            }
        </div>
    );
};