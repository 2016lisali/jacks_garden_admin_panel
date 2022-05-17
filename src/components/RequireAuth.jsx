import { useEffect } from 'react';
import decode from 'jwt-decode';
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { loginUser, logout } from '../redux/userReducer';
import { useDispatch } from 'react-redux';

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('jg_admin'))?.user;
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
  const isAdmin = JSON.parse(localStorage.getItem('jg_admin'))?.user.isAdmin;
  if (!isAdmin) return (<Navigate to='/login' />);
  return children;
}

export default RequireAuth;