import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const isAuthenticated = Cookies.get("jwt_token");
  if (isAuthenticated === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
