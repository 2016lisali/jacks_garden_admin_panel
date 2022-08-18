import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginSuccess, logout } from "../redux/userReducer";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { deleteCookie } from "../api/api";

const Footer = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
        try {
            const res = await deleteCookie();
            console.log("delete cookie res", res);
        } catch (error) {
            console.log("delete cookie error", error);
        }
    };
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("jg_admin"))?.user;
        if (user) {
            if (user.expires > new Date().toISOString()) {
                dispatch(
                    loginSuccess({
                        userId: user.userId,
                        isAdmin: user.isAdmin,
                        firstName: user.firstName,
                    })
                );
            } else {
                handleLogout();
            }
        }
        // eslint-disable-next-line
    }, [location]);
    return (
        <Container className="footer-container center pt-3" fluid="xl">
            <hr />
            <p className="text-center text-secondary">
                ©2022 Jack's Garden All rights reserved
            </p>
        </Container>
    );
};

export default Footer;
