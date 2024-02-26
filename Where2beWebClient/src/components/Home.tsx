import { SideBar } from "./SideBar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/homeStyles.ts'
import addImage from '../assets/add.png';
import { useEffect, useState } from "react";
import { AddLocationDialog } from "./AddLocationDialog.tsx";
import LocationCard from "./LocationCard.tsx";
import { styles, responsive } from "../assets/homeStyles.ts";
import GoogleMapsComponent from "./GoogleMap.tsx";
import { useCookies } from "react-cookie";


//getting user data from database
export const Home = () => {
    const [cookies] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description', 'image_url']);
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



    console.log(files);

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



    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
            <SideBar userEmail={cookies.email} />
            {cookies.folder_id ?
                (<div style={{ display: "flex", flexDirection: "column", marginLeft: "6vh", marginTop: "5vh", width: "85%" }}>
                    <div style={{ display: "flex", flexDirection: "row", height: "auto" }}>
                        <div style={{ width: "80%" }}>
                            <Carousel className="carousel" responsive={responsive}>
                                {filteredAndSortedFiles.map((files) => <LocationCard key={files.file_id} files={files} />)}

                            </Carousel>
                        </div>
                        <div style={{display: "flex",alignItems: "center",justifyContent: "center",width: "30vh"}}>
                            <img src={addImage} onClick={openLocationDialog} style={styles.addImage} alt="add image" />
                        </div>
                    </div>
                    <AddLocationDialog userEmail={email} isDialogOpen={isDialogOpen} closeDialog={closeLocationDialog} />
                    <div style={{ position:"relative",display: "flex", flexDirection: "column", padding: "20px", height: "60vh", width: "98%", marginTop: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "15px" }}>
                        <h1 style={{ marginTop: "1px" }}>
                            {cookies.title}
                        </h1>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column", marginRight: 20 }}>
                                <p style={{ width: "76vh", wordWrap: "break-word" }}>
                                    {cookies.description}
                                </p>
                                <div style={{position:"absolute",bottom:20,left:20, overflow: "hidden", objectFit: "cover"}}>
                                    {cookies.title ? (<img style={{ objectPosition: "center", width: "100%",height:"40vh",display:"block"}} src={cookies.image_url} alt="" />) : null}
                                </div>
                            </div>
                            <div style={{ position: "absolute", right: 20, bottom: 20 }}>
                                {isDialogOpen ? null : <GoogleMapsComponent apiKey={apiKey} mapContainerStyle={{ width: "85vh", height: "50vh" }} isDialogOpen={isDialogOpen} />}
                            </div>
                        </div>
                    </div>
                </div>) : null
            }
        </div>
    );
};