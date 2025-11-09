import { auth } from "../firebaseConfig/firebase.config";
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const AuthProvider = ({children}) => {

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (payload) => {
        return updateProfile(auth.currentUser, payload)
    }

    const value = {
        createUser,
        updateUser
    }
    return <AuthContext value={value}>{children}</AuthContext>
};

export default AuthProvider;