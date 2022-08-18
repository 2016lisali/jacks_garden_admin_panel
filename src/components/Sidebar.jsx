import { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image, ListGroup } from "react-bootstrap";
import {
    Flower1,
    Receipt,
    PeopleFill,
    Shop,
    BoxArrowRight,
    Envelope,
    HouseHeartFill,
    EmojiSunglasses,
} from "react-bootstrap-icons";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userReducer";
import { deleteCookie } from "../api/api";

const Sidebar = ({ display }) => {
    const username = useSelector((state) => state.currentUser?.firstName);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const homeLinkElement = useRef();
    const productsLinkElement = useRef();
    const ordersLinkElement = useRef();
    const customersLinkElement = useRef();
    const mailingListLinkElement = useRef();

    useEffect(() => {
        const currentPage = location.pathname.split("/")[1];
        switch (currentPage) {
            case "":
                homeLinkElement.current.classList.add("active");
                break;
            case "products":
                productsLinkElement.current.classList.add("active");
                break;
            case "orders":
                ordersLinkElement.current.classList.add("active");
                break;
            case "customers":
                customersLinkElement.current.classList.add("active");
                break;
            case "mailinglist":
                mailingListLinkElement.current.classList.add("active");
                break;
            default:
                productsLinkElement.current.classList.remove("active");
                ordersLinkElement.current.classList.remove("active");
                customersLinkElement.current.classList.remove("active");
                mailingListLinkElement.current.classList.remove("active");
                homeLinkElement.current.classList.remove("active");
        }
    }, [location]);

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/");
        try {
            const res = await deleteCookie();
            console.log("delete cookie res", res);
        } catch (error) {
            console.log("delete cookie error", error);
        }
    };
    return (
        <div
            className={`sidebar d-${display} d-lg-flex flex-column bg-white shadow`}
        >
            <Link to="/">
                <Image src={logo} roundedCircle alt="store logo" />
            </Link>
            <ListGroup variant="flush" as="ul" className="mt-3 flex-grow-1">
                <ListGroup.Item
                    action
                    variant="light"
                    ref={homeLinkElement}
                    href="/"
                    className="side-link fw-bolder"
                >
                    <HouseHeartFill />
                    DASHBOARD
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    variant="light"
                    ref={productsLinkElement}
                    href="/products"
                    className="side-link fw-bolder"
                >
                    <Flower1 />
                    PRODUCTS
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    variant="light"
                    ref={ordersLinkElement}
                    href="/orders"
                    className="side-link fw-bolder"
                >
                    <Receipt />
                    ORDERS
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    variant="light"
                    ref={customersLinkElement}
                    href="/customers"
                    className="side-link fw-bolder"
                >
                    <PeopleFill />
                    CUSTOMERS
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    variant="light"
                    ref={mailingListLinkElement}
                    href="/mailinglist"
                    className="side-link fw-bolder"
                >
                    <Envelope />
                    MAILING LIST
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    variant="light"
                    className="side-link fw-bolder"
                    href="https://jacksgarden.netlify.app/"
                >
                    <Shop />
                    STORE
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    variant="light"
                    className="side-link fw-bolder"
                    onClick={handleLogout}
                >
                    <BoxArrowRight /> LOG OUT
                </ListGroup.Item>
                <div className="py-3 px-2 text-center">
                    Have a lovely day,{" "}
                    {username === "test" ? "Stranger" : username}{" "}
                    <EmojiSunglasses />
                </div>
            </ListGroup>
        </div>
    );
};

export default Sidebar;
