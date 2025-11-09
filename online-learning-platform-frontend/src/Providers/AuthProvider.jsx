import { auth } from "../firebaseConfig/firebase.config";
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword } from "firebase/auth";


const AuthProvider = ({children}) => {

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const value = {
        createUser
    }
    return <AuthContext value={value}>{children}</AuthContext>
};

export default AuthProvider;