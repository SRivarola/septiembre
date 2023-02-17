import Head from "next/head"
import useAuth from "../hooks/useAuth"
import { useForm, SubmitHandler } from 'react-hook-form'
import Navbar from "../components/Navbar"
import CustomButton from "../components/CustomButton"

interface Inputs {
    email: string
    password: string
}

const Login = () => {

    const { signIn } = useAuth()

    const { register, handleSubmit, formState: { errors }} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async({email, password}) => {
        !errors.email && !errors.password && await signIn(email, password)
    }

  return (
    <main className="flex justify-center w-screen h-screen bg-primary pt-36">
        <Head>
            <title>Septiembre - Login</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="w-[95%] h-fit rounded-md border-secondary border-2">
            <div className="bg-secondary flex items-center justify-center py-2">
                <h1 className="font-bold text-xl">LOGIN</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="m-4" autoComplete="off">
                <div className="flex flex-col gap-1 text-white my-4">
                    <label>Email:</label>
                    <input 
                        className="h-9 rounded outline-none px-2 bg-[#272626] text-secondary placeholder:font-thin placeholder:italic"
                        placeholder="Ingrese su email"
                        {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                    />
                    <label className="h-4 text-red-500 text-xs px-2">{errors.email && '*Email invalido!'}</label>
                </div>
                <div className="flex flex-col gap-1 text-white my-4">
                    <label>Contraseña:</label>
                    <input 
                        className="h-9 rounded outline-none px-2 bg-[#272626] text-secondary placeholder:font-thin placeholder:italic"
                        placeholder="Ingrese su contraseña"
                        type='password'
                        {...register('password', {required: true, minLength: 6, maxLength: 12})}
                    />
                    <label className="h-4 text-red-500 text-xs px-2">{errors.password && '*contraseña invalida!'}</label>
                </div>
                <CustomButton label='ENTRAR' />
            </form>
        </div>
    </main>
  )
}

export default Login