import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Config/FirebaseConfig";


export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [currentuser, setcurrentuser] = useState(null);
    const [loading, setloading] = useState(true);


    const adduserToFirestore = async (user) => {
        if (!user) return;
        try {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
            })
        } catch (error) {
            console.error("Error adding user to Firestore:", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setcurrentuser(user);
            if (user) {
                adduserToFirestore(user);
            }
            setloading(false);
        });
        return unsubscribe;
    }, []);

    const logout = () => signOut(auth); 
    return (
        <AuthContext.Provider value={{ currentuser, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

