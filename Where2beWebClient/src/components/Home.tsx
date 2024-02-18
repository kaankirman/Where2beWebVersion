import { SideBar } from "./SideBar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/homeStyles.ts'
import addImage from '../assets/add.png';
import { useEffect, useState } from "react";
import { AddLocationDialog } from "./AddLocationDialog.tsx";
import LocationCard from "./LocationCard.tsx";
import { styles } from "../assets/homeStyles.ts";
import imagePlaceholder from '../assets/imagePlaceholder.jpg';
import GoogleMapsComponent from "./GoogleMap.tsx";
import { Cookies, useCookies } from "react-cookie";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 2000 },
        items: 4
    },
    adjustedDesktop: {
        breakpoint: { max: 2000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const responsiveImages = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 2000 },
        items: 5
    },
    adjustedDesktop: {
        breakpoint: { max: 2000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
//getting user data from database
export const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);
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
        <div style={{ display: "flex", flexDirection: "row", /* backgroundImage: `url(${backgroundImage})` */ }}>
            <SideBar userEmail={cookies.email} />
            {/* page will differ based on the folder choice */}
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 30, marginTop: 20, width: "85%" }}>
                <div style={{ display: "flex", flexDirection: "row", height: "auto" }}>
                    <div style={{ width: "80%" }}>
                        <Carousel className="carousel" responsive={responsive}>
                            {filteredAndSortedFiles.map((files) => <LocationCard key={files.file_id} files={files} />)}

                        </Carousel>
                    </div>
                    <div>
                        <img src={addImage} onClick={openLocationDialog} style={styles.addImage} alt="add image" />
                    </div>
                </div>
                <AddLocationDialog userEmail={email} isDialogOpen={isDialogOpen} closeDialog={closeLocationDialog} />
                <div style={{ display: "flex", flexDirection: "column", padding: "20px", height: "100%", width: "95%", marginTop: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "15px" }}>
                    <div style={{ height: "auto", marginLeft: "10%", marginRight: "10%", marginTop: "20px" }}>
                        <Carousel className="carousel" responsive={responsiveImages}>
                            {/* pull images, map them inside */}
                            <img style={{ height: "200px" }} src={imagePlaceholder} alt="" />
                            <img style={{ height: "200px" }} src={imagePlaceholder} alt="" />
                            <img style={{ height: "200px" }} src={imagePlaceholder} alt="" />
                            <img style={{ height: "200px" }} src={imagePlaceholder} alt="" />
                            <img style={{ height: "200px" }} src={imagePlaceholder} alt="" />
                        </Carousel>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        <h1 style={{ marginTop: "20px" }}>
                            {cookies.title}
                        </h1>
                        <div style={{ display: "flex", flexDirection: "row", width: "90%" }} >
                            <p style={{ width: "150%", textAlign: "center" }}>
                                {cookies.description}
                            </p>
                            {isDialogOpen ? null : <GoogleMapsComponent apiKey={apiKey} isDialogOpen={isDialogOpen}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};