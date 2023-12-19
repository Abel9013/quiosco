import { useRouter } from "next/router"

const fases =  [
  {fase:1, nombre:"Para preparar", url:"/admin"},
  {fase:2, nombre:"Listos", url:"/admin/listos"},
  
] 
const Fases = () => {
  const router = useRouter()
  const calcularProgreso = () => {
    let valor 
    if(router.pathname==="/admin"){
      valor=2
    } else {
      valor= 100 
    }
    return valor
  }
  return (
   <>
      <div className="flex justify-between mb-5">
        {fases.map((fase)=>(
          <button key={fase.fase} 
                  onClick={()=>{router.push(fase.url)
                    
                  }}     
                  className="text-2xl font-bold
          ">
            {fase.nombre}
          </button>
        ) )}
      </div>
      <div className="bg-gray-100 mb-10">
        <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
             style={{width:`${calcularProgreso()}%` }}>

        </div>
      </div>
    </>
  )
}

export default Fases