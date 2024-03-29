import React from "react";

const SuccessDiv = ({ message }) => {
    return (
        <div
            className="success-div d-flex justify-content-center
     align-items-center bg-white bg-opacity-50 p-4"
        >
            <h3>{message}</h3>
        </div>
    );
};

export default SuccessDiv;
