import useQuiosco from "../hooks/useQuiosco"
import Layout from "../layout/Layout"
import ResumenProducto from "../components/ResumenProducto"

export default function Resumen({}){

    const {pedido} = useQuiosco()
    console.log(pedido.length);
    return (
        <Layout pagina="Resumen">
            <h2 className="text-4xl font-black">Resumen</h2>
            <p className="text-2xl">Revisa tu pedido</p>
            {pedido.length === 0 ? (
                    <p className="text-center text-2xl">No hay elementos en su pedido</p>
                ) : (
                        pedido.map((producto)=> <ResumenProducto key={producto.id} producto={producto}/>
                   ) 
                )
                
            }
        </Layout>
       
    )
}