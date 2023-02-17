import CustomButton from "../components/CustomButton"
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"
import Navbar from "../components/Navbar"

interface Inputs {
    name: string
    lastName: string
    area: string
    email: string
}

const Profesores = () => {

    const [admin, setAdmin] = useState<string>('false')
    const [adminValue, setAdminValue] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors }} = useForm<Inputs>()

    const { signUp, signIn } = useAuth()

    const onSubmit: SubmitHandler<Inputs> = async({name, lastName, area, email}) => {
        const mail = email + '@septiembre.com'
        const password = '123456'
        const collectionRef = collection(db, 'users')
        await addDoc(collectionRef, {
            name: name,
            lastName: lastName,
            area: area,
            admin: adminValue,
            email: mail
        })
        signUp(mail, password)
        setTimeout(() => {
            signIn(process.env.NEXT_PUBLIC_adminUser, process.env.NEXT_PUBLIC_adminPassword)
        }, 2500);
    }

    useEffect(() => {
      setAdminValue(admin === 'false' ? false : true)
    }, [admin])
    

  return (
    <>
        <Navbar/>
        <div className="flex flex-col w-full h-screen items-center bg-primary pt-28">
            <h1 className="text-white font-semibold text-xl my-6">Cargar profesores</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4 flex flex-col gap-3">
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Nombre:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese el nombre"
                        {...register('name', {required: true})}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Apellido:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese el apellido"
                        {...register('lastName', {required: true})}

                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Area:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese el area"
                        {...register('area', {required: true})}

                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">email:</label>
                    <div className="flex gap-2 w-[80%] items-center">
                        <input 
                            className="h-7 w-[50%] rounded outline-none px-2 italic text-right"
                            placeholder="Ingrese el email"
                            {...register('email', {required: true})}
                        />
                        <p className="text-secondary text-sm">@septiembre.com</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center justify-end">
                    <label className="text-white">admin</label>
                    <input 
                        type='checkbox'
                        value={admin}
                        onChange={() => setAdmin(admin === 'false' ? 'true' : 'false')}
                    />
                </div>
                <CustomButton label='CARGAR' />
            </form>
        </div>
    </>
  )
}
export default Profesores