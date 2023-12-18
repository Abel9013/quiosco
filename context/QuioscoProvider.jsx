import {useState, useEffect, createContext} from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState("")
    const [total, setTotal] = useState(0)
    
    const router = useRouter()

    const colocarOrden = async (e)=>{
        e.preventDefault()
        try {
             await axios.post("api/ordenes",{ pedido, nombre, total, fecha:Date.now().toString()})
            //  Resetear app
            
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre("")
            setTotal(0)

            toast.success("Pedido realizado con exito")
            setTimeout(() => {
                router.push("/")
            },2500)
            
        } catch (error) {
            console.log(error);
        }
       
         
    }
    const obtenerCategorias = async ()=>{
        const { data } = await axios("/api/categorias")
        setCategorias(data)
     }

    useEffect(()=>{
        obtenerCategorias()
    },[])
    useEffect(()=>{
        setCategoriaActual(categorias[0])
    },[categorias])
    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        // console.log(categoria[0]);
        // Al ser un array method devuelve un arreglo, por eso pongo categoria[0]
        setCategoriaActual(categoria[0]);
        router.push("/")
    }
    const handleSetProducto = producto => setProducto(producto)
    const handleChangeModal = () => {
        setModal(!modal)
    }
    const handleAgregarPedido = ({categoriaId,...producto}) => {

        if(pedido.some(productoState => productoState.id === producto.id )){
            // Actualizar cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success("Guardado correctamente")
        }else{
            setPedido([...pedido,producto])
            toast.success("Agregado al pedido")
        }
        setModal(false)
    }
    const handleEditarCantidad = (id) => {
        const productoActualizar = pedido.filter(producto=>producto.id=== id)
        setProducto(productoActualizar[0])
        handleChangeModal()
    }
    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(productoActual=>productoActual.id !== id)
        setPedido(pedidoActualizado)
    }
    useEffect(()=>{
        const nuevoTotal = pedido.reduce(
         (total, producto)=>(producto.precio*producto.cantidad)+total, 0 
        )
      
        setTotal(nuevoTotal)
    },[pedido])

    
    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre, 
                colocarOrden,
                total

            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}


export {
    QuioscoProvider
}

export default QuioscoContext