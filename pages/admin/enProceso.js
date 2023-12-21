import useSWR from "swr"
import axios from "axios"
import AdminLayout from "../../layout/AdminLayout"

import Procesando from "../../components/Procesando"


const procesando = () => {
  const fetcher = () => axios("/api/procesando").then(datos => datos.data)  
  const { data, error, isLoading } = useSWR("/api/ordenesListas", fetcher,{refreshInterval:100})

  return (
       <AdminLayout pagina={"En proceso"}>
        <h1 className="text-4xl font-black">Panel de Administracion</h1>
        <h2 className="text-2xl font-medium py-2">Ordenes en proceso</h2>
         <p className="text-2xl mt-10 mb-4">Ordenes en proceso: { (data?.length) ? data?.length : 0 }  </p>
         {/* <p className="text-2xl mb-10">Total a recaudar:<span className="font-semibold">{formatearDinero(+totalDePedidos)}</span></p> */}
        { data && data.length ? data.map(orden => 
            <Procesando key={orden.id} orden={orden} />
        ) : <p className="mt-2">"No hay ordenes en proceso"</p> }
    </AdminLayout>
  )
}

export default procesando