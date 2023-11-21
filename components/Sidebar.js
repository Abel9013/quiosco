import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
const Sidebar = () => {

  const {categorias} = useQuiosco()

  return ( 
    <>
      <Image 
        width={200}
        height={100} 
        src={"/assets/img/logo.svg"} 
        alt="Imagen logotipo" 
        priority="high"
       />

       <nav className="mt-10">
          {categorias.map((categoria)=>{
            return  <Categoria
                        key={categoria.id}
                        categoria={categoria}    
                    />
                      }
                  )
          }
       </nav>
    </>

  )
}

export default Sidebar