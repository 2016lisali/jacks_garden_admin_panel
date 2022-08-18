import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const isAdmin = JSON.parse(localStorage.getItem("jg_admin"))?.user.isAdmin;
    console.log(isAdmin);
    if (!isAdmin) return <Navigate to="/login" />;
    return children;
};

export default RequireAuth;
