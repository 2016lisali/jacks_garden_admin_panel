
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import decode from 'jwt-decode';
import { Navigate, useLocation } from "react-router-dom";
import { loginUser, logout } from '../redux/userReducer';
import { useDispatch } from 'react-redux';
const Footer = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout());
    Navigate("/login");
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('jg_user'))?.user;
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout()
      } else {
        dispatch(loginUser({ userId: user.userId, isAdmin: user.isAdmin }))
      }
    }
    // eslint-disable-next-line
  }, [location]);
  return (
    <Container className="footer-container center pt-3" fluid="xl">
      <hr />
      <p className="text-center text-secondary">©2022 Jack's Garden All rights reserved</p>
    </Container>
  )
}

export default Footer