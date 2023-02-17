import Head from "next/head"
import Navbar from "../../components/Navbar"
import { useSearchParams } from 'next/navigation'

const Actividad = () => {
  
  const searchParams = useSearchParams()
  const actividad = searchParams.get('actividad')?.split('[')[1].split(']')[0]

  return (
    <div className="flex min-h-screen flex-col py-2 pt-24 bg-primary">
      <Head>
        <title>Septiembre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex flex-col items-center w-full p-6">
        <h1 className="text-white font-semibold text-xl my-6 capitalize">{actividad}</h1>

      </div>
    </div>
  )
}


export default Actividad