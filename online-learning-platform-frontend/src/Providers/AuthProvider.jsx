import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig/firebase.config";
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (payload) => {
        return updateProfile(auth.currentUser, payload)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        })

        return () => unSubscribe()

    }, [])

    const value = {
        createUser,
        updateUser,
        user,
        logout
    }
    return <AuthContext value={value}>{children}</AuthContext>
};

export default AuthProvider;