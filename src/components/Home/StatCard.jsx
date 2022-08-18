import { Card } from "react-bootstrap";

const StatCard = ({ title, amount, link, bg }) => {
    return (
        <Card className={`w-100 shadow my-3 bg-opacity-25 ${bg}`}>
            <Card.Body>
                <Card.Subtitle className="mb-2 fw-bold">{title}</Card.Subtitle>
                <Card.Title>{amount}</Card.Title>
                <Card.Link href={link}>See all {title}</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default StatCard;
