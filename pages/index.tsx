import type { NextPage } from 'next'
import Head from 'next/head'
import Actividades from './actividades'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'

const Home: NextPage = () => {

  const { user } = useAuth()
  const userData = useUser(user)
  console.log(user?.email)

  return (
    <div className="flex min-h-screen flex-col py-2 pt-24 bg-primary">
      <Head>
        <title>Septiembre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {/* {
        userData?.admin === true && (
          <Actividades />
        )
      }
      {
        userData?.admin === false &&  (
          'no soy admin'
        )
      } */}
    </div>
  )
}

export default Home
