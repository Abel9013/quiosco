import { useEffect, useCallback } from "react";
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

export default function Total(){
    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco( ) 
    
    const comprobarFormulario = useCallback(()=>{
        
        return pedido.length===0 || nombre==='' || nombre.length < 3
    },[pedido, nombre])

    useEffect(()=>{
        comprobarFormulario()
    },[pedido, comprobarFormulario])
    
   
   
   return (
        <Layout pagina="Total y confirmar pedido">
            <h2 className="text-4xl font-black">Total y confirmar pedido</h2>
            <p className="text-2xl">Confirma tu pedido a continuacion</p>
            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        className="bg-gray-200 w-full  mt-3 lg:w-1/3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <div className="mt-10">
                        <p className="text-2xl">Total a pagar: {" "} <span className="font-bold">{formatearDinero(total)}</span></p>
                    </div>
                    <div className="mt-5">
                        <input 
                            type="submit"
                            className={`${comprobarFormulario() ? "bg-indigo-100 " : "bg-indigo-600 hover:bg-indigo-800"} text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}
                            value={"Confirmar pedido"}
                            disabled= {comprobarFormulario()}
                        />
                    </div>
                </div>
            </form>
        </Layout>
       
    )
}