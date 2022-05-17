import { useState, useEffect } from "react";
import decode from 'jwt-decode';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Image, ListGroup } from "react-bootstrap";
import { Flower1, Receipt, PeopleFill, Shop, BoxArrowRight } from "react-bootstrap-icons";
import logo from "../assets/logo.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userReducer";

const Sidebar = ({ display }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('jg_admin'))?.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
    }
    //????
    setUser(JSON.parse(localStorage.getItem('jg_admin'))?.user)
    // eslint-disable-next-line
  }, [location])
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className={`sidebar d-${display} d-md-flex flex-column bg-white shadow`}>
      <Link to="/"><Image src={logo} roundedCircle alt="store logo" /></Link>
      <ListGroup variant="flush" as="ul" className="mt-3 flex-grow-1">
        <ListGroup.Item action variant="light" href="/products" className="side-link fw-bolder" id="products">
          <Flower1 />PRODUCTS
        </ListGroup.Item>
        <ListGroup.Item action variant="light" href="/orders" className="side-link fw-bolder" id="orders">
          <Receipt />ORDERS
        </ListGroup.Item>
        <ListGroup.Item action variant="light" href="/customers" className="side-link fw-bolder" id="customers_link">
          <PeopleFill />CUSTOMERS
        </ListGroup.Item>
        <ListGroup.Item action variant="light" className="side-link fw-bolder" href="https://jacksgarden.netlify.app/">
          <Shop />STORE
        </ListGroup.Item>
        <ListGroup.Item action variant="light" className="side-link fw-bolder" onClick={handleLogout}>
          <BoxArrowRight /> LOG OUT
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar