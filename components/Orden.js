import Image from "next/image"
import axios from "axios"
import { toast } from "react-toastify"
import { formatearDinero } from "../helpers/index"
const Orden = ({orden}) => {
  const {id, nombre, total, pedido} = orden
const cambiarEstadoProcesando = async () => {
  try {
    await axios.post(`/api/ordenes/${id}?action=procesar`);
    toast.success("Orden marcada como procesando");
  } catch (error) {
    toast.error("Hubo un error");
  }
};
  // const completarOrden = async () => {
  //   try {
  //     // const data = await axios.post(`/api/ordenes/${id}`)
  //      await axios.post(`/api/ordenes/${id}`)
  //     toast.success("Orden Lista")
  //   } catch (error) {
  //     toast.error("hubo un error")
  //   }
  // }
  
  
  return (
    <div className="border p-10 space-y-5">
       <h3 className="text-2xl font-bold">Orden:{id}</h3>
       <p className="text-lg font-bold">Cliente:{nombre}</p>
       <div>
          {pedido.map(plato => (
            <div key={plato.id} className="py-3 flex border-b last-of-type:border-0 items-center">
              <div className="w-32">
                <Image
                  width={400}
                  height={500}
                  src={`/assets/img/${plato.imagen}.jpg`}
                  alt={`Imagen del plato: ${plato.nombre}`}
                /> 
              </div>
              <div className="p-5 space-y-2 ">
                <h4 className="text-xl font-bold text-amber-500">{plato.nombre}</h4>
                <p className="text-lg">Cantidad:{plato.cantidad}</p>
              </div>
            </div>
          ))}
       </div>
       <div className="md:flex md:items-center md:justify-between my-10">
            <p className="mt 5 font-black text-4xl amber-500">
              Total a pagar: {formatearDinero(total)}
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
              type="button"
              onClick={cambiarEstadoProcesando}
            >
              Procesar Orden</button>
       </div>
    </div>
  )
}

export default Orden