import CustomButton from "../components/CustomButton"
import { useForm, SubmitHandler } from 'react-hook-form'
import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"
import { alertError, alertSuccess } from "../constants/alerts"
import Navbar from "../components/Navbar"

interface Inputs {
    name: string
    lastName: string
    dni: number
    celular: string
    edad: number
    email: string
    direccion: string
    actividad: string
}

const Alumnos = () => {

    const { register, handleSubmit, resetField, formState: { errors }} = useForm<Inputs>()

    const resetFields = () => {
        resetField('name')
        resetField('lastName')
        resetField('dni')
        resetField('celular')
        resetField('edad')
        resetField('email')
        resetField('direccion')
        resetField('actividad')
    }

    const onSubmit: SubmitHandler<Inputs> = ({name, lastName, dni, celular, edad, email, direccion, actividad}) => {
        const collectionRef = collection(db, 'alumnos')
        addDoc(collectionRef, {
            name: name,
            lastName: lastName,
            dni: dni,
            celular: celular,
            edad: edad,
            email: email,
            direccion: direccion,
            actividad: actividad
        })
            .then(() => {
                alertSuccess('Usuario cargado!')
                resetFields()
            })
            .catch(err => alertError(err.message))
    }

  return (
    <>
        <Navbar />
        <div className="flex flex-col w-full h-screen items-center bg-primary pt-28">
            <h1 className="text-white font-semibold text-xl my-6">Cargar alumnos</h1>

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
                    <label className="text-white w-[20%]">DNI:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese el dni"
                        {...register('dni', {required: true})}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Celular:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese el numero celular"
                        {...register('celular', {required: true})}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Edad:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese la edad"
                        {...register('edad', {required: true})}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Email:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese el email"
                        {...register('email', {required: true})}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Lote:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese la dirección"
                        {...register('direccion', {required: true})}
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <label className="text-white w-[20%]">Actividad:</label>
                    <input 
                        className="h-7 w-[80%] rounded outline-none px-2 italic"
                        placeholder="Ingrese la actividad"
                        {...register('actividad', {required: true})}
                    />
                </div>
                <CustomButton label='CARGAR' />
            </form>

        </div>
    </>
  )
}
export default Alumnos