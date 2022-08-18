import { Spinner } from "react-bootstrap";
const IsFetchingModal = () => {
    return (
        <div
            className="isFetching-modal d-flex justify-content-center
     align-items-center position-absolute
     top-0 start-0 w-100 h-100"
        >
            <Spinner animation="border" variant="success" role="status" />
        </div>
    );
};

export default IsFetchingModal;
