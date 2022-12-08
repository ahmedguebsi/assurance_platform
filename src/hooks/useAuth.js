import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
//generate a token
//require('crypto').randomBytes(64).toString('hex')
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;