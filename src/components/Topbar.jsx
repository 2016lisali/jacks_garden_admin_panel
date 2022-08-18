import { useState } from "react";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Topbar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Container
                fluid
                className="navbar-container fixed-top bg-white d-lg-none shadow"
                style={{ height: "66px" }}
            >
                <Navbar
                    expand="sm"
                    className="container-xxl bg-white d-flex flex-column justify-content-center align-items-center bg-white h-100"
                >
                    <div className="nav1 w-100 d-flex justify-content-between align-items-center">
                        <Navbar.Brand className="navBrand d-flex justify-content-sm-center">
                            <Link to="/" className="text-decoration-none">
                                <span className="fw-bold">
                                    Jack's Garden Admin
                                </span>
                            </Link>
                        </Navbar.Brand>
                        <div className="d-flex flex-row justify-content-end align-items-center">
                            <List size="30px" onClick={handleShow} />
                            <Offcanvas
                                className="w-auto p-0"
                                show={show}
                                onHide={handleClose}
                            >
                                <Offcanvas.Header
                                    closeButton
                                    className="position-fixed"
                                ></Offcanvas.Header>
                                <Offcanvas.Body className="p-0">
                                    <Sidebar display="flex" />
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                    </div>
                </Navbar>
            </Container>
            <Container
                className="w-100 d-block d-lg-none"
                style={{ height: "66px" }}
            ></Container>
        </>
    );
};

export default Topbar;
