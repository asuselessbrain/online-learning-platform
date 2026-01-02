import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig/firebase.config";
import { AuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (payload) => {
        return updateProfile(auth.currentUser, payload)
    }

    const logout = () => {
        return signOut(auth)
    }

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const deleteUserFromAuth = () => {
        return deleteUser(auth.currentUser)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribe()

    }, [])

    const value = {
        createUser,
        updateUser,
        user,
        logout,
        loginWithGoogle,
        loginWithEmail,
        loading,
        setLoading,
        deleteUserFromAuth
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthProvider;