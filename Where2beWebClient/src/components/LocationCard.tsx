import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imagePlaceholder from '../assets/media/imagePlaceholder.jpg';
import { styles } from "../assets/homeStyles.ts";
import { useCookies } from 'react-cookie';

function LocationCard({ files }: { files: any }) {
    const [, setCookie] = useCookies(['email', 'accessToken', 'folder_id', 'lat', 'lng', 'title', 'description', 'image_url']);

    const onLocationCardClick = () => {
        setCookie('lat', files.lat);
        setCookie('lng', files.lon);
        setCookie('title', files.title);
        setCookie('description', files.description);
        setCookie('image_url', files.url);
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
                    {files.description.length > 90 ? files.description.substring(0, 90) + "..." : files.description}
                </Card.Text>
                <Button style={{background:"#F7DE32",borderColor:"#F7DE32"}} variant="primary" onClick={onLocationCardClick}>Show more</Button>
            </Card.Body>
        </Card>
    );
}

export default LocationCard;