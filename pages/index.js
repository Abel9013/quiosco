import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'

export default function Home() {

  const {categoriaActual} = useQuiosco()
  // console.log(categoriaActual);
  return (
      <Layout pagina={`Menú ${categoriaActual?.nombre}`}> 
     {/* <Layout pagina={ categoriaActual?.nombre ? `Menú ${categoriaActual.nombre}` : 'Menú Café'}> */}
     
     <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
     
     <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuacion</p>
   
      {categoriaActual?.productos?.map(producto=>(
        <Producto key={producto.id} producto={producto} />
      ) )}
   
   </Layout>
  )
}

