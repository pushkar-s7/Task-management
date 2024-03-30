import { Navigate,Outlet } from "react-router-dom";

const PrivateRoute=()=>{
    const auth=localStorage.getItem('auth');

    return auth?<Outlet/>:<Navigate to="/signup"/>
};
export default PrivateRoute;