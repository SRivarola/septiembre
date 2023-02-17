import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../config/firebase'
import { alertError, alertSuccess } from '../constants/alerts'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    message: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    message: null,
    loading: false
})

interface AuthProvidersProps {
    children: React.ReactNode
}

export const AuthProvider = ({children}: AuthProvidersProps) => {

    const [initialLoading, setInitialLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() =>
      onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user)
            setLoading(false)
        } else {
            setUser(null)
            setLoading(true)
            router.push('/login')
        }
        
        setInitialLoading(false)
      }), 
    [auth])

    const signUp = async (email: string, password: any) => {
        setLoading(true)
        
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => alertSuccess('El usuario ah sido creado'))
            .catch(err => alertError(err.message))
            .finally(() => setLoading(false))
    }

    const signIn = async (email: string, password: any) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential)
                setUser(userCredential.user)
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            })
            .catch(err => {
                if(err.message === 'Firebase: Error (auth/user-not-found).'){
                    alertError('Usuario incorrecto')
                } else if(err.message === 'Firebase: Error (auth/wrong-password).'){
                    alertError('Contraseña incorrecta')
                } else {
                    alertError('Error, intente nuevamente!')
                }
            })
            .finally(() => setLoading(false))
    }

    const logout = async() => {
        setLoading(true)

        signOut(auth)
            .then(() => setUser(null))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }

    const memoedValue = useMemo(() => ({
        user, signUp, signIn, logout, message, loading 
    }), [user, loading])
    
    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth(){
    return useContext(AuthContext)
}