import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { loginSuccess, logout } from '../redux/userReducer';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('jg_admin'))?.user;
    if (user) {
      if (user.expires > new Date().toISOString()) {
        dispatch(loginSuccess({ userId: user.userId, isAdmin: user.isAdmin, firstName: user.firstName }))
      } else {
        handleLogout()
      }
    }

    // const token = user?.token;
    // if (token) {
    //   const decodedToken = decode(token)
    //   if (decodedToken.exp * 1000 < new Date().getTime()) {
    //     handleLogout()
    //   } else {
    //     decodedToken.isAdmin === 1
    //       ? dispatch(loginSuccess({ userId: user.userId, isAdmin: user.isAdmin, token: user.token, firstName: user.firstName }))
    //       : handleLogout()
    //   }
    // }
    // eslint-disable-next-line
  }, [location]);
  return (
    <Container className="footer-container center pt-3" fluid="xl">
      <hr />
      <p className="text-center text-secondary">©2022 Jack's Garden All rights reserved</p>
    </Container>
  )
}

export default Footer;