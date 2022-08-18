import { Spinner } from "react-bootstrap";
import React from "react";

const FetchingSpinner = () => {
    return (
        <Spinner
            animation="border"
            variant="secondary"
            role="status"
            size="sm"
        />
    );
};

export default FetchingSpinner;
