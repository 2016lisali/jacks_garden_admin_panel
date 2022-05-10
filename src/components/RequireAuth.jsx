import { Navigate } from "react-router-dom"

const RequireAuth = ({ children }) => {
  const isAdmin = JSON.parse(localStorage.getItem('jg_user'))?.user.isAdmin;

  if (!isAdmin) return (<Navigate to='/login' />);
  return children;
}

export default RequireAuth;