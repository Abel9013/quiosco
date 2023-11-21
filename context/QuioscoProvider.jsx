import {useState, useEffect, createContext} from "react"
import axios from "axios"
const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
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
    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual
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