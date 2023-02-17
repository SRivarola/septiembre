import Link from "next/link"
import useAuth from "../hooks/useAuth"
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import useUser from "../hooks/useUser";

const Navbar = () => {

  const { logout, user } = useAuth()
  const userData = useUser(user)
  const [menu, setMenu] = useState(false)
  console.log(menu)
  return (
    <div className="absolute top-0 left-0 w-screen h-24 flex justify-center items-center shadow-md shadow-secondary/30">
        <Link href='/' className="font-bold text-3xl text-secondary">
            SEPTIEMBRE
        </Link>
        {
          userData?.admin === true && (
            <div className="absolute right-5">
            {
              menu ? (
                <AiOutlineClose onClick={() => setMenu(!menu)} className="text-secondary w-[20px] h-[20px]"/>
              ) : (
                <AiOutlineMenu onClick={() => setMenu(!menu)} className="text-secondary w-[20px] h-[20px]"/>
              )
            }
            </div>
          )
        }
        {
          menu && (
            <ul className="absolute top-24 w-screen flex flex-col items-center gap-2 py-2 bg-primary text-white border-t border-[grey] shadow-md shadow-secondary/30">
              <li><Link onClick={() => setMenu(false)} href='/alumnos'>CARGAR ALUMNOS</Link></li>
              <li><Link onClick={() => setMenu(false)} href='/actividades'>ACTIVIDADES</Link></li>
              <li><Link onClick={() => setMenu(false)} href='/profesores'>CARGAR PROFESORES</Link></li>
              <li><button onClick={logout} >SALIR</button></li>
              {/*<li><Link href='/'></Link></li> */}
            </ul>
          )
        }
    </div>
  )
}

export default Navbar