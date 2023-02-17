import Link from "next/link"
import Navbar from "../components/Navbar"

const Actividades = () => {

    const actividades = ['futbol', 'hockey']

  return (
    <>
        <Navbar />
        <div className="flex flex-col w-full h-screen items-center bg-primary pt-28">
            <h1 className="text-white font-semibold text-xl my-6">Actividades</h1>
            <ul className="text-secondary flex flex-col gap-5 my-5 items-center">
                {
                    actividades.map((actividad, i) => (
                        <li key={i} className='text-lg font-semibold capitalize'>
                            <Link href={`/actividad/[${actividad}]`}>{actividad}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
  )
}
export default Actividades