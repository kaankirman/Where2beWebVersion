import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import imagePlaceholder from '../assets/imagePlaceholder.jpg';
import { styles } from "../assets/homeStyles.ts";

function LocationCard({ files }: { files: any }) {
    return (
            <Card style={styles.cardStyle}>
                <Card.Img style={styles.carouselImg} variant="top" src={imagePlaceholder} />
                <Card.Body>
                    <Card.Title>{files.title}</Card.Title>
                    <Card.Text>
                        {files.description}
                    </Card.Text>
                    <Button variant="primary">Show more</Button>
                </Card.Body>
            </Card>
    );
}

export default LocationCard;