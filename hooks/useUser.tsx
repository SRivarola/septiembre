import { User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

interface IData {
    id: string
    admin: boolean
    area: string
    email: string
    lastName: string
    name: string
}

const useUser = (user: User | null) => {

    const [dataUser, setDataUser] = useState<IData | null>(null)

    useEffect(() => {
        
        const getDocument = async () => {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', user?.email))
            getDocs(q)  
               .then((resp) => {
                    const data: any = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                    setDataUser(data[0])
               })
        }
        
        user && getDocument()
        
    }, [user])
    
    return dataUser
}

export default useUser