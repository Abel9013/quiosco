import useSWR from "swr"
import axios from "axios"
import AdminLayout from "../../layout/AdminLayout"
import OrdenLista from "../../components/OrdenLista"
import { formatearDinero } from "../../helpers"


const listos = () => {
   const fetcher = () => axios("/api/ordenesListas").then(datos => datos.data)  
   const { data, error, isLoading } = useSWR("/api/ordenesListas", fetcher,{refreshInterval:100})
   const totalDePedidos = data?.reduce((acumulador, pedido) => acumulador + pedido.total, 0)
   console.log(data);
   console.log(data?.length);
   console.log(totalDePedidos);
  return (
    <AdminLayout pagina={"admin/listos"}>
        <h1 className="text-4xl font-black">Panel de Administracion</h1>
         <p className="text-2xl mt-10 mb-4">Ordenes listas: { (data?.length) ? data?.length : 0 }  </p>
         <p className="text-2xl mb-10">Total a recaudar:<span className="font-semibold">{formatearDinero(+totalDePedidos)}</span></p>
        { data && data.length ? data.map(orden => 
            <OrdenLista key={orden.id} orden={orden} />
        ) : <p className="mt-2">"No hay pedidos listos"</p> }
    </AdminLayout>
  )
}

export default listos


