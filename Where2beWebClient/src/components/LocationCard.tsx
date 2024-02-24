import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imagePlaceholder from '../assets/imagePlaceholder.jpg';
import { styles } from "../assets/homeStyles.ts";
import { useCookies } from 'react-cookie';

function LocationCard({ files }: { files: any }) {
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description']);

    const onLocationCardClick = () => {
        setCookie('lat', files.lat);
        setCookie('lng', files.lon);
        setCookie('title', files.title);
        setCookie('description', files.description);
    };

    return (
        <Card style={styles.cardStyle}>
            {files.url ? (
                <Card.Img style={styles.carouselImg} variant="top" src={files.url} />
            ) : (
                <Card.Img style={styles.carouselImg} variant="top" src={imagePlaceholder} />
            )}
            <Card.Body>
                <Card.Title>{files.title}</Card.Title>
                <Card.Text>
                    {files.description}
                </Card.Text>
                <Button variant="primary" onClick={onLocationCardClick}>Show more</Button>
            </Card.Body>
        </Card>
    );
}

export default LocationCard;