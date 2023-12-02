import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {
  
  const { handleClickCategoria, categoriaActual } = useQuiosco()
  const{nombre, icono, id} = categoria
  
  return (
    <>
      <div className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <button type="button"
          className="text-2xl font-bold hover:cursor-pointer flex items-center gap-2"
          onClick={()=>handleClickCategoria(id) }
          >
        <Image 
          width={65}
          height={65}
          src={`/assets/img/icono_${icono}.svg`}
          alt="imagen logo"
        />
          {nombre}
        </button>
      </div>
    </>

  )
}

export default Categoria